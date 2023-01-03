import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-svg-viewer[src]',
  templateUrl: './svg-viewer.component.html',
  styleUrls: ['./svg-viewer.component.scss'],
})
export class SvgViewerComponent implements AfterViewInit {
  @Input() src = '';
  @ViewChild('map') mapElementRef: ElementRef<HTMLElement> | undefined;
  get mapElement() { return this.mapElementRef?.nativeElement; }

  private map: L.Map | undefined;
  private readonly bounds: L.LatLngBoundsExpression = [[0, 0], [150, 150]];


  ngAfterViewInit(): void {
    if (!this.mapElement) {
      throw new Error("Cannot initialize map. 'mapElement' is undefined.");
    }

    this.map = new L.Map(this.mapElement, {
      crs: L.CRS.Simple,
    });
    L.imageOverlay(this.src, this.bounds).addTo(this.map);
    this.map.attributionControl.addAttribution('<a href="https://leafletjs.com/" target="_blank">Leaflet</a>');
    this.map.attributionControl.setPrefix(false);
    this.map.fitBounds(this.bounds);
  }
}
