import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TableOfContentsEntry } from 'src/app/shared/models/information/table-of-contents-item';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class TableOfContentsComponent {
  @Input() path = '';
  @Input() entries: TableOfContentsEntry[] | undefined;
}
