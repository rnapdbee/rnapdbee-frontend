import { Component, Input, OnInit } from '@angular/core';
import { defer, finalize } from 'rxjs';
import { Calculation } from 'src/app/shared/models/calculation.model';
import { SecondaryFlags } from 'src/app/shared/models/secondary-flags.model';
import { SecondaryOutput } from 'src/app/shared/models/secondary-output.model';
import { SecondaryToDbnParams } from 'src/app/shared/models/secondary-to-dbn-params.module';
import { SecondaryToDbnService } from 'src/app/shared/services/calculation/secondary-to-dbn.service';
import { SnackBarService } from 'src/app/shared/services/notifications/snack-bar.service';
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

  constructor(
    private readonly descriptionService: DescriptionService,
    private readonly calculationService: SecondaryToDbnService,
    private readonly snackBar: SnackBarService,
  ) {}

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
    defer(() => {
      this.loading = true;

      if (!this.calculation?.id) {
        throw new Error('Calculation ID could not be defined.');
      }

      if (!this.reanalyzeParams) {
        throw new Error('Reanalyze parameters could not be defined.');
      }

      return this.calculationService.reanalyze(this.calculation.id, this.reanalyzeParams);
    })
      .pipe(
        finalize(() => { this.loading = false; }),
      )
      .subscribe({
        error: (error: Error) => {
          this.snackBar.error(error.message);
        },
      });
  }

  getDescription(params: SecondaryToDbnParams) {
    return this.descriptionService.generateSecondaryDescription(params);
  }

  selectAll(): void {
    if (this.isAllSelected()) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.unSelectThis(i);
      }
    } else {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.selectThis(i);
      }
    }
  }

  select(index: number): void {
    if (this.isSelected(index)) {
      this.unSelectThis(index);
    } else {
      this.selectThis(index);
    }
  }

  isAllSelected(): boolean {
    let isAllSelected = true;
    for (let i = 0; i < this.selected.length; i += 1) {
      isAllSelected = isAllSelected && this.isSelected(i);
    }
    return isAllSelected;
  }

  isSelected(index: number): boolean {
    return Object.keys(this.selected[index])
      .map((item: string) => !!this.selected[index][item as keyof typeof this.selected[number]])
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  }

  private selectThis(index: number): void {
    Object.keys(this.selected[index]).forEach((item: string) => {
      this.selected[index][item as keyof typeof this.selected[number]] = true;
    });
  }

  private unSelectThis(index: number): void {
    Object.keys(this.selected[index]).forEach((item: string) => {
      this.selected[index][item as keyof typeof this.selected[number]] = false;
    });
  }
}
