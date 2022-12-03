import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STRUCTURAL_ELEMENTS_HANDLING, VISUALISATION_TOOL } from 'src/app/shared/constants/param-options.const';
import { SecondaryToDbnParams } from 'src/app/shared/models/params/secondary-to-dbn-params.module';

@Component({
  selector: 'app-secondary-to-dbn-params-form',
  templateUrl: './secondary-to-dbn-params-form.component.html',
  styleUrls: ['./secondary-to-dbn-params-form.component.scss'],
})
export class SecondaryToDbnParamsFormComponent implements OnInit {
  @Input() startWith = 1;
  @Input() params: SecondaryToDbnParams | undefined;
  @Output() paramChange = new EventEmitter<SecondaryToDbnParams>();

  readonly STRUCTURAL_ELEMENTS_HANDLING = STRUCTURAL_ELEMENTS_HANDLING;
  readonly VISUALISATION_TOOL = VISUALISATION_TOOL;

  paramsForm = this.fb.group({
    removeIsolated: [false],
    structuralElementsHandling: [STRUCTURAL_ELEMENTS_HANDLING[0].key],
    visualizationTool: [VISUALISATION_TOOL[0].key],
  });

  constructor(private readonly fb: FormBuilder) {
    this.paramsForm.valueChanges.subscribe((data: SecondaryToDbnParams) => {
      this.paramChange.emit(data);
    });
  }

  ngOnInit(): void {
    this.paramChange.emit(this.paramsForm.value as SecondaryToDbnParams);
    if (this.params) {
      this.updateFormValues(this.params);
    }
  }

  getStepNumber(position: number): number {
    return this.startWith + position - 1;
  }

  private updateFormValues(params: SecondaryToDbnParams): void {
    this.paramsForm.setValue(params);
  }
}
