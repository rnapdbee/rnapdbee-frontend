import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  ANALYSIS_TOOL,
  MODEL_SELECTION,
  NON_CANONICAL_HANDLING,
  STRUCTURAL_ELEMENTS_HANDLING,
  VISUALISATION_TOOL
} from 'src/app/shared/constants/param-options.const';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';

@Component({
  selector: 'app-tertiary-to-dbn-params-form',
  templateUrl: './tertiary-to-dbn-params-form.component.html',
  styleUrls: ['./tertiary-to-dbn-params-form.component.scss'],
})
export class TertiaryToDbnParamsFormComponent implements OnInit {
  @Input() startWith = 1;
  @Input() params: TertiaryToDbnParams | undefined;
  @Output() paramChange = new EventEmitter<TertiaryToDbnParams>();

  readonly MODEL_SELECTION = MODEL_SELECTION;
  readonly ANALYSIS_TOOL = ANALYSIS_TOOL;
  readonly NON_CANONICAL_HANDLING = NON_CANONICAL_HANDLING;
  readonly STRUCTURAL_ELEMENTS_HANDLING = STRUCTURAL_ELEMENTS_HANDLING;
  readonly VISUALISATION_TOOL = VISUALISATION_TOOL;

  paramsForm = this.fb.group({
    modelSelection: [MODEL_SELECTION[0].key],
    analysisTool: [ANALYSIS_TOOL[0].key],
    nonCanonicalHandling: [NON_CANONICAL_HANDLING[0].key],
    removeIsolated: [false],
    structuralElementsHandling: [STRUCTURAL_ELEMENTS_HANDLING[0].key],
    visualizationTool: [VISUALISATION_TOOL[0].key],
  });

  constructor(private readonly fb: FormBuilder) {
    this.paramsForm.valueChanges.subscribe((data: TertiaryToDbnParams) => {
      this.paramChange.emit(data);
    });
  }

  ngOnInit(): void {
    this.paramChange.emit(this.paramsForm.value as TertiaryToDbnParams);
    if (this.params) {
      this.updateFormValues(this.params);
    }
  }

  getStepNumber(position: number): number {
    return this.startWith + position - 1;
  }

  private updateFormValues(params: TertiaryToDbnParams): void {
    this.paramsForm.setValue(params);
  }
}
