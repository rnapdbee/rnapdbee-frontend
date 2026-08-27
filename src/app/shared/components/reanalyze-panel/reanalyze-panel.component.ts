import { Component, ChangeDetectionStrategy } from '@angular/core';
import { animateClose, animateOpen } from '../../animations/open-close';
import { ControlValueComponent, ControlValueProvider } from '../control-value/control-value.component';

@Component({
  selector: 'app-reanalyze-panel',
  templateUrl: './reanalyze-panel.component.html',
  styleUrls: ['./reanalyze-panel.component.scss'],
  providers: [ControlValueProvider(ReanalyzePanelComponent)],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ReanalyzePanelComponent extends ControlValueComponent<boolean> {
  protected readonly animateOpen = animateOpen;
  protected readonly animateClose = animateClose;

  constructor() { super(false); }

  toggleExpand() {
    this.value = !this.value;
  }
}
