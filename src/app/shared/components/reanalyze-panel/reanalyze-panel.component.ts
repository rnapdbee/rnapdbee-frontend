import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OpenCloseAnimation } from '../../animations/open-close';
import { ControlValueComponent, ControlValueProvider } from '../control-value/control-value.component';

@Component({
  selector: 'app-reanalyze-panel',
  templateUrl: './reanalyze-panel.component.html',
  styleUrls: ['./reanalyze-panel.component.scss'],
  animations: [OpenCloseAnimation],
   
  providers: [ControlValueProvider(ReanalyzePanelComponent)],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ReanalyzePanelComponent extends ControlValueComponent<boolean> {
  constructor() { super(false); }

  toggleExpand() {
    this.value = !this.value;
  }
}
