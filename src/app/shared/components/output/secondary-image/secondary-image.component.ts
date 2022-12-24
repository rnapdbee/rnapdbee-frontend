import { Component, Input } from '@angular/core';
import { DrawingResult, ImageInformation } from 'src/app/shared/models/output/secondary-output.model';
import { SelectField } from 'src/app/shared/models/select/select-field.model';
import { VISUALIZATION_TOOL } from '../../../constants/param-options.const';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';


@Component({
  selector: 'app-secondary-image',
  templateUrl: './secondary-image.component.html',
  styleUrls: ['./secondary-image.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(SecondaryImageComponent)],
})
export class SecondaryImageComponent extends ControlValueComponent<SelectField> {
  @Input() imageInformation: ImageInformation | undefined;
  DrawingResult: typeof DrawingResult = DrawingResult;

  constructor() { super(new SelectField(false)); }

  getVisualizationName(rawName: string): string {
    return VISUALIZATION_TOOL.find(item => item.key === rawName)?.label ?? rawName;
  }
}
