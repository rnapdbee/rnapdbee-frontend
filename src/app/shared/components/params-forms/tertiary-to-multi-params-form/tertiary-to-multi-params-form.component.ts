import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MODEL_SELECTION, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { TertiaryToMultiParams } from 'src/app/shared/models/tertiary-to-multi-params.model';

@Component({
  selector: 'app-tertiary-to-multi-params-form',
  templateUrl: './tertiary-to-multi-params-form.component.html',
  styleUrls: ['./tertiary-to-multi-params-form.component.scss'],
})
export class TertiaryToMultiParamsFormComponent implements OnInit {
  @Input() startWith = 1;
  @Input() params: TertiaryToMultiParams | undefined;
  @Output() paramChange = new EventEmitter<TertiaryToMultiParams>();

  MODEL_SELECTION = MODEL_SELECTION;
  VISUALISATION_TOOL = VISUALISATION_TOOL;

  paramsForm = this.fb.group({
    modelSelection: [MODEL_SELECTION[0].key],
    includeNonCanonical: [false],
    removeIsolated: [false],
    visualizationTool: [VISUALISATION_TOOL[0].key],
  });

  constructor(private readonly fb: FormBuilder) {
    this.paramsForm.valueChanges.subscribe((data: TertiaryToMultiParams) => {
      this.paramChange.emit(data);
    });
  }

  ngOnInit(): void {
    this.paramChange.emit(this.paramsForm.value as TertiaryToMultiParams);
    if (this.params) {
      this.updateFormValues(this.params);
    }
  }

  getStepNumber(position: number): number {
    return this.startWith + position - 1;
  }

  private updateFormValues(params: TertiaryToMultiParams): void {
    this.paramsForm.setValue(params);
  }
}
