import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SecondaryFlags } from 'src/app/shared/models/flags/secondary-flags.model';
import { DrawingResult, ImageInformation } from 'src/app/shared/models/output/secondary-output.model';
import { ControlValueComponent } from '../control-value.component';


@Component({
  selector: 'app-secondary-image',
  templateUrl: './secondary-image.component.html',
  styleUrls: ['./secondary-image.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => SecondaryImageComponent),
      multi: true,
    },
  ],
})
export class SecondaryImageComponent extends ControlValueComponent<SecondaryFlags> {
  @Input() imageInformation: ImageInformation | undefined;
  DrawingResult: typeof DrawingResult = DrawingResult;

  constructor() {
    super(SecondaryFlags);
  }
}
