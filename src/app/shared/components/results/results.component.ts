import { Directive, Input } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { SelectArray } from '../../models/select/select-array.model';
import { SelectSubObject } from '../../models/select/select-fields.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';
import { DownloadService } from '../../services/downlaod/download.service';

@Directive()
export abstract class ResultsComponent
  <P extends Params, O, S extends SelectArray<SelectSubObject>> {
  private _calculation: Calculation<P, O> | undefined;
  @Input() set calculation(value: Calculation<P, O> | undefined) {
    if (value !== undefined) {
      this.populateSelectedList(value);
    }
    this._calculation = value;
  }
  get calculation() { return this._calculation; }

  reanalyzeParams: P | undefined;
  reanalyzePanelExpanded = false;
  selected: S | undefined;

  reanalyzeCallback = () => {
    if (!this.calculation?.id) {
      throw new Error('Calculation ID could not be determined.');
    }
    if (!this.reanalyzeParams) {
      throw new Error('Reznalyze parameters could not be determined.');
    }
    if (!this.reanalyzeParamsValid(this.reanalyzeParams)) {
      throw new Error('You already have a calculation with given parameters. Provide different parameters.');
    }
    return this.calculationService.reanalyze(this.calculation.id, this.reanalyzeParams);
  };

  constructor(
    protected calculationService: CalculationRequestService<P, O>,
    protected downloadService: DownloadService,
    protected path: ApiPaths,
  ) {}

  onParamsChange(event: P): void {
    this.reanalyzeParams = event;
  }

  onSubmit(event: Observable<Calculation<Params, unknown>>): void {
    event.pipe(tap(() => { this.reanalyzePanelExpanded = false; })).subscribe();
  }

  selectAll(): void {
    this.selected?.set(!this.allSelected());
  }

  allSelected(): boolean {
    return this.selected?.isSelectedOrUnactive() ?? false;
  }

  download(): void {
    if (this.calculation?.id && this.selected) {
      this.downloadService.download(this.path, this.calculation.id, this.selected.getValue());
    }
  }

  protected abstract populateSelectedList(calculation: Calculation<P, O>): void;

  private reanalyzeParamsValid(reanalyzeParams: P): boolean {
    return !this.calculation?.results
      .map(result => result.params)
      .some(params => JSON.stringify(params) === JSON.stringify(reanalyzeParams));
  }
}
