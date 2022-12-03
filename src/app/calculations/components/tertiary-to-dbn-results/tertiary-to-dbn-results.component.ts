import { Component, Input, OnInit } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation/calculation.model';
import { TertiaryOutput } from 'src/app/shared/models/output/tertiary-output.model';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';
import { TertiaryToDbnService } from 'src/app/shared/services/calculation/tertiary-to-dbn.service';

@Component({
  selector: 'app-tertiary-to-dbn-results[calculation]',
  templateUrl: './tertiary-to-dbn-results.component.html',
  styleUrls: ['./tertiary-to-dbn-results.component.scss'],
})
export class TertiaryToDbnResultsComponent implements OnInit {
  private _calculation: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined;
  @Input() set calculation(value: Calculation<TertiaryToDbnParams, TertiaryOutput> | undefined) {
    if (value) {
      this.populateSelectedList(value.results.length);
    }
    this._calculation = value;
  }
  get calculation() {
    return this._calculation;
  }

  constructor(
    private readonly calculationService: TertiaryToDbnService,
  ) {}

  ngOnInit(): void {
    if (!this.calculation) {
      throw new Error('Provide calculation parameter');
    }
  }

  selectAll() {
    // TODO
  }

  isAllSelected(): boolean {
    return false;
    // TODO
  }

  private populateSelectedList(_: number) {
    // TODO
  }
}
