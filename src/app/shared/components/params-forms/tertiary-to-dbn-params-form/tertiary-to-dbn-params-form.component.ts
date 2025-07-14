import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ANALYSIS_TOOL,
  MODEL_SELECTION,
  NON_CANONICAL_HANDLING,
  STRUCTURAL_ELEMENTS_HANDLING,
  VISUALIZATION_TOOL,
} from 'src/app/shared/constants/param-options.const';
import { TertiaryToDbnParams } from 'src/app/shared/models/params/tertiary-to-dbn-params.model';

@Component({
  selector: 'app-tertiary-to-dbn-params-form',
  templateUrl: './tertiary-to-dbn-params-form.component.html',
  styleUrls: ['./tertiary-to-dbn-params-form.component.scss'],
})
export class TertiaryToDbnParamsFormComponent implements OnInit {
  @Input() isTestLayout: boolean = false;
  @Input() startWith = 1;
  @Input() params: TertiaryToDbnParams | undefined;
  @Output() paramChange = new EventEmitter<TertiaryToDbnParams>(true);

  readonly MODEL_SELECTION = MODEL_SELECTION;
  readonly ANALYSIS_TOOL = ANALYSIS_TOOL;
  readonly NON_CANONICAL_HANDLING = NON_CANONICAL_HANDLING;
  readonly STRUCTURAL_ELEMENTS_HANDLING = STRUCTURAL_ELEMENTS_HANDLING;
  readonly VISUALIZATION_TOOL = VISUALIZATION_TOOL;

  paramsForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.paramsForm = this.fb.group({
      modelSelection: [this.MODEL_SELECTION[0].key],
      analysisTool: [
        this.isTestLayout
          ? this.ANALYSIS_TOOL[1].key // second item for test layout
          : this.ANALYSIS_TOOL[0].key, // first item for normal layout
      ],
      nonCanonicalHandling: [this.NON_CANONICAL_HANDLING[0].key],
      structuralElementsHandling: [this.STRUCTURAL_ELEMENTS_HANDLING[0].key],
      visualizationTool: [this.VISUALIZATION_TOOL[0].key],
      removeIsolated: [false],
    });

    // Move this subscription here!
    this.paramsForm.valueChanges.subscribe((data: TertiaryToDbnParams) => {
      this.paramChange.emit(data);
    });

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
