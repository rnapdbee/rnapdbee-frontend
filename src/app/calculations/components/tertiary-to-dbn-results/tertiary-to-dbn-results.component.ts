import { Component, Input, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiarySelect } from 'src/app/shared/models/select/tertiary-select.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';

@Component({
  selector: 'app-tertiary-to-dbn-results[calculation]',
  templateUrl: './tertiary-to-dbn-results.component.html',
  styleUrls: ['./tertiary-to-dbn-results.component.scss'],
})
export class TertiaryToDbnResultsComponent implements OnInit {
  private _calculation: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined;
  @Input() set calculation(value: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined) {
    if (value !== undefined) {
      this.populateSelectedList(value);
    }
    this._calculation = value;
  }
  get calculation() { return this._calculation; }

  reanalyzeParams: TertiaryToDbnParams | undefined;
  reanalyzePanelExpanded = false;
  selected = new TertiarySelect([]);

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
    protected calculationService: TertiaryToDbnService,
  ) {}

  ngOnInit(): void {
    if (!this.calculation) {
      throw new Error('Provide calculation parameter');
    }
  }

  onParamsChange(event: TertiaryToDbnParams): void {
    this.reanalyzeParams = event;
  }

  onSubmit(event: Observable<Calculation<Params, unknown>>) {
    event.pipe(tap(() => { this.reanalyzePanelExpanded = false; })).subscribe();
  }

  selectAll(): void {
    this.selected.set(!this.allSelected());
  }

  allSelected(): boolean {
    return this.selected.isSelectedOrUnactive();
  }

  private populateSelectedList(calculation: Calculation<TertiaryToDbnParams, TertiaryOutput>) {
    const modelLengths = calculation.results.map(item => item.output.models.length);
    this.selected = new TertiarySelect(modelLengths);
  }
}
