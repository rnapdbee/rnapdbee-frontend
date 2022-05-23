import { Component, Input } from '@angular/core';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [OpenCloseAnimation],
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() showControls = false;
  @Input() expanded = false;

  onChange() {
    this.checked = !this.checked;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
