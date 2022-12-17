import { Component } from '@angular/core';
import { OpenCloseAnimation } from '../../animations/open-close';
import { ControlValueComponent, ControlValueProvider } from '../control-value/control-value.component';

@Component({
  selector: 'app-reanalyze-panel',
  templateUrl: './reanalyze-panel.component.html',
  styleUrls: ['./reanalyze-panel.component.scss'],
  animations: [OpenCloseAnimation],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(ReanalyzePanelComponent)],
})
export class ReanalyzePanelComponent extends ControlValueComponent<boolean> {
  constructor() { super(false); }

  toggleExpand() {
    this.value = !this.value;
  }
}
