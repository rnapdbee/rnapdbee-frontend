import { Component } from '@angular/core';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-reanalyze-panel',
  templateUrl: './reanalyze-panel.component.html',
  styleUrls: ['./reanalyze-panel.component.scss'],
  animations: [OpenCloseAnimation],
})
export class ReanalyzePanelComponent {
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
