import { AfterViewInit, Component, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-svg-viewer[src]',
  templateUrl: './svg-viewer.component.html',
  styleUrls: ['./svg-viewer.component.scss'],
})
export class SvgViewerComponent implements AfterViewInit {
  @Input() src = '';
  @Input() id: number | undefined;

  private map: L.Map | undefined;
  private readonly bounds: L.LatLngBoundsExpression = [[0, 0], [150, 150]];

  ngAfterViewInit(): void {
    this.map = new L.Map(`map${this.id ?? ''}`, {
      crs: L.CRS.Simple,
    });
    L.imageOverlay(this.src, this.bounds).addTo(this.map);
    this.map.fitBounds(this.bounds);
  }
}
