import { Component, Input } from '@angular/core';
import { OpenCloseAnimation } from '../../animations/open-close';
import { ControlValueComponent, ControlValueProvider } from '../control-value/control-value.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [OpenCloseAnimation],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(CheckboxComponent)],
})
export class CheckboxComponent extends ControlValueComponent<boolean> {
  @Input() label = '';
  @Input() showControls = true;
  @Input() expanded = false;
  @Input() textView = false;
  @Input() tableView = false;

  constructor() { super(false); }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }
}
