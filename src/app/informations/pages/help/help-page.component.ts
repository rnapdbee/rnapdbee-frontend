import { Component } from '@angular/core';
import { TableOfContentsEntry } from 'src/app/shared/models/information/table-of-contents-item';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {
  // TODO: update this according to document struture
  helpSections: TableOfContentsEntry[] = [
    {
      name: 'General information',
      link: 'general-information',
      children: [],
    },
    {
      name: 'How to use RNApdbee',
      link: 'how-to-use',
      children: [
        {
          name: '3D scenario',
          link: '3d-scenario',
        },
        {
          name: '2D scenario',
          link: '2d-scenario',
        },
      ],
    },
  ];
}
