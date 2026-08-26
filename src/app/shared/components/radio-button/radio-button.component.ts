import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { OpenCloseAnimation } from 'src/app/shared/animations/open-close';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  animations: [OpenCloseAnimation],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class RadioButtonComponent {
  @Input() checked = false;
  @Input() label = '';
  @Input() value: string | number = '';
}
