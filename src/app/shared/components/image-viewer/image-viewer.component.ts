import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
  @Input() src = '';

  viewerOptions = {
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: true,
      zoomOut: true,
      reset: true,
    },
    loading: true,
    inline: true,
    initialCoverage: 1,
    className: 'img-viewer',
  };
}
