import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { HOST } from 'src/environments/environment';

@Component({
  selector: 'app-svg-viewer[src]',
  templateUrl: './svg-viewer.component.html',
  styleUrls: ['./svg-viewer.component.scss'],
})
export class SvgViewerComponent implements AfterViewInit {
  @Input() src = '';
  @ViewChild('map') mapElementRef: ElementRef<HTMLElement> | undefined;
  get mapElement() { return this.mapElementRef?.nativeElement; }
  get url(): string { return `${HOST}${this.src}`; }

  private map: L.Map | undefined;
  private readonly bounds: L.LatLngBoundsExpression = [[0, 0], [150, 150]];

  loading = true;
  error = false;

  ngAfterViewInit(): void {
    if (!this.mapElement) {
      throw new Error("Cannot initialize map. 'mapElement' is undefined.");
    }

    this.map = new L.Map(this.mapElement, {
      crs: L.CRS.Simple,
      zoomSnap: 0.1,
      zoomDelta: 0.25,
    });

    const svgOverlay = L.imageOverlay(this.url, this.bounds);
    svgOverlay.addTo(this.map);
    this.map.fitBounds(this.bounds);

    this.removeAttribution(this.map);
    this.handleOverlayLoading(svgOverlay);
    this.handleOverlayError(this.map, svgOverlay);
  }

  private removeAttribution(map: L.Map): void {
    map.attributionControl.remove();
    map.attributionControl.setPrefix(false);
  }

  private handleOverlayLoading(overlay: L.ImageOverlay): void {
    overlay.addEventListener('load', () => {
      this.loading = false;
    });
  }

  private handleOverlayError(map:L.Map, overlay: L.ImageOverlay): void {
    overlay.addEventListener('error', () => {
      this.loading = false;
      this.error = true;
      this.mapElement?.style.setProperty('height', '200px');
      map.remove();
    });
  }
}
