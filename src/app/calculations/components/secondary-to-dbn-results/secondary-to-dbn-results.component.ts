import { Component, Input, OnInit } from '@angular/core';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { SecondaryFlags } from 'src/app/shared/models/secondary-flags.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { DescriptionService } from 'src/app/shared/services/result/description.service';

@Component({
  selector: 'app-secondary-to-dbn-results[calculation]',
  templateUrl: './secondary-to-dbn-results.component.html',
  styleUrls: ['./secondary-to-dbn-results.component.scss'],
})
export class SecondaryToDbnResultsComponent implements OnInit {
  @Input() calculation: Calculation<SecondaryToDbnParams, SecondaryOutput> | undefined;
  reanalyzeParams: SecondaryToDbnParams | undefined;
  loading = false;
  selected: SecondaryFlags[] = [];

  constructor(private readonly descriptionService: DescriptionService) {}

  ngOnInit(): void {
    if (!this.calculation) {
      throw new Error('Provide calculation parameter');
    }

    for (let i = 0; i < this.calculation.results.length; i += 1) {
      this.selected.push(new SecondaryFlags());
    }
  }

  onParamsChange(event: SecondaryToDbnParams): void {
    this.reanalyzeParams = event;
  }

  reanalyze(): void {
    // TODO: reanalyze with different parameters
    this.loading = true;
  }

  selectAll(): void {
    for (let i = 0; i < this.selected.length; i += 1) {
      this.selectThis(i);
    }
  }

  selectThis(index: number): void {
    Object.keys(this.selected[index]).forEach((e: string) => {
      this.selected[index][e as keyof typeof this.selected[number]] = true;
    });
  }

  getDescription(params: SecondaryToDbnParams) {
    return this.descriptionService.generateSecondaryDescription(params);
  }
}
