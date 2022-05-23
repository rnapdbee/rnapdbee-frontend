import { Component, Input } from '@angular/core';
import { OpenCloseAnimation } from 'src/app/shared/animations/open-close';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  animations: [OpenCloseAnimation],
})
export class RadioButtonComponent {
  @Input() checked = false;
  @Input() label = '';
  @Input() value: any;

  onChange() {
    this.checked = !this.checked;
  }
}
