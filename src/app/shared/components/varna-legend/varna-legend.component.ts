import { Component } from '@angular/core';
import { VARNA_LEGEND_ENTRIES } from '../../constants/varna-legend-entries.const';

@Component({
  selector: 'app-varna-legend',
  templateUrl: './varna-legend.component.html',
  styleUrls: ['./varna-legend.component.scss'],
})
export class VarnaLegendComponent {
  legendEntries = VARNA_LEGEND_ENTRIES;
}
