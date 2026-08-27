import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { animateClose, animateOpen } from 'src/app/shared/animations/open-close';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class RadioButtonComponent {
  protected readonly animateOpen = animateOpen;
  protected readonly animateClose = animateClose;

  @Input() checked = false;
  @Input() label = '';
  @Input() value: string | number = '';
}
