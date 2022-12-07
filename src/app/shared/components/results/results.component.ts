import { Directive, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { Select } from '../../models/select/select.model';
import { CalculationRequestService } from '../../services/calculation/calculation-request.service';

@Directive()
export abstract class ResultsComponent<P extends Params, O, S extends Select<O>> implements OnInit {
  private _calculation: Calculation<P, O> | undefined;
  @Input() set calculation(value: Calculation<P, O> | undefined) {
    if (value !== undefined) {
      this.populateSelectedList(value.results.length);
    }
    this._calculation = value;
  }
  get calculation() { return this._calculation; }

  reanalyzeParams: P | undefined;
  reanalyzePanelExpanded = false;
  selected: S[] = [];

  reanalyzeCallback = () => {
    if (!this.calculation?.id) {
      throw new Error('Calculation ID could not be determined.');
    }
    if (!this.reanalyzeParams) {
      throw new Error('Reznalyze parameters could not be determined.');
    }
    return this.calculationService.reanalyze(this.calculation.id, this.reanalyzeParams);
  };

  constructor(
    protected calculationService: CalculationRequestService<P, O>,
    protected SelectObj: new () => S,
  ) {}

  ngOnInit(): void {
    if (!this.calculation) {
      throw new Error('Provide calculation parameter');
    }
  }

  onParamsChange(event: P): void {
    this.reanalyzeParams = event;
  }

  onSubmit(event: Observable<Calculation<Params, unknown>>) {
    event.pipe(tap(() => { this.reanalyzePanelExpanded = false; })).subscribe();
  }

  selectAll(): void {
    const allSelected = this.allSelected();
    this.selected.forEach(item => {
      item.set(!allSelected);
    });
  }

  allSelected(): boolean {
    return this.selected
      .map(item => item.isSelected())
      .reduce((previous: boolean, next: boolean) => previous && next, true);
  }

  selectOne(index: number): void {
    this.selected[index].set(!this.isSelected(index));
  }

  isSelected(index: number): boolean {
    return this.selected[index].isSelected();
  }

  private populateSelectedList(length: number) {
    this.selected = [];
    for (let i = 0; i < length; i += 1) {
      this.selected.push(new this.SelectObj());
    }
  }
}
