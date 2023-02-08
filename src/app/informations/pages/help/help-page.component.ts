import { Component } from '@angular/core';
import { TableOfContentsEntry } from 'src/app/shared/models/information/table-of-contents-item';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.scss'],
})
export class HelpPageComponent {
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
          name: '3D → (...)',
          link: '3d-scenario',
        },
        {
          name: '2D → (...)',
          link: '2d-scenario',
        },
        {
          name: '3D → multi 2D',
          link: '3d-multi-2d',
        },
      ],
    },
    {
      name: 'Changes in RNApdbee 3.0',
      link: 'v3-changes',
      children: []
    },
    {
      name: 'RNApdbee routines',
      link: 'routines',
      children: [
        {
          name: 'Base-pair identification',
          link: 'bps-identification',
        },
        {
          name: 'Handling of missing residues',
          link: 'missing'
        },
        {
          name: 'Handling of non-canonical interactions',
          link: 'non-canonical'
        },
        {
          name: 'Secondary structure drawing',
          link: '2d-drawing'
        },
        {
          name: 'Multiple secondary structures',
          link: 'multiple-explanation'
        }
      ]
    },
    {
      name: 'Supported file formats',
      link: 'formats',
      children: []
    },
    {
      name: 'System requirements',
      link: 'requirements',
      children: []
    }
  ];
}
