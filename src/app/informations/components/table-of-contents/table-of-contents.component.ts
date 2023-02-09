import { Component, Input } from '@angular/core';
import { TableOfContentsEntry } from 'src/app/shared/models/information/table-of-contents-item';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
})
export class TableOfContentsComponent {
  @Input() path = '';
  @Input() entries: TableOfContentsEntry[] | undefined;
}
