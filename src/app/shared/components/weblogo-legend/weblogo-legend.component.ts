import { Component } from '@angular/core';
import { WEBLOGO_LEGEND_ENTRIES } from '../../constants/weblogo-legend-entries.const';

@Component({
  selector: 'app-weblogo-legend',
  templateUrl: './weblogo-legend.component.html',
  styleUrls: ['./weblogo-legend.component.scss'],
})
export class WeblogoLegendComponent {
  legendEntries = WEBLOGO_LEGEND_ENTRIES;
}
