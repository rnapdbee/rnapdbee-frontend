import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Triples, Residue } from 'src/app/shared/models/output/tertiary-output.model';

@Component({
  selector: 'app-triples-table',
  templateUrl: './triples-table.component.html',
  styleUrls: ['./triples-table.component.scss'],
})
export class TriplesTableComponent implements OnChanges, AfterViewInit {
  @Input() triples: Triples[] = [];
  @Input() label = 'Base triples';

  @ViewChild(MatSort) sort: MatSort | null = null;

  filterValue = '';
  open = true;

  displayedColumns: (keyof Triples)[] = [
    'residue',
    'type',
    'firstPartner',
    'secondPartner',
  ];

  dataSource = new MatTableDataSource<Triples>([]);

  // mapping for headers and cell renderers used by the template
  tripleColumns: Record<
    keyof Triples,
    { header: string; cell: (t: Triples) => string }
    > = {
      residue: {
        header: 'Residue',
        cell: t => this.formatResidue(t.residue),
      },
      type: {
        header: 'Type',
        cell: t => t.type ?? '',
      },
      firstPartner: {
        header: 'First Partner',
        cell: t => this.formatResidue(t.firstPartner),
      },
      secondPartner: {
        header: 'Second Partner',
        cell: t => this.formatResidue(t.secondPartner),
      },
    };

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes as SimpleChanges & { triples?: SimpleChange }).triples) {
      this.dataSource.data = this.triples ?? [];
      // use a named method instead of a long inline arrow to satisfy max-len/arrow rules
      this.dataSource.filterPredicate = this.tripleFilterPredicate.bind(this);
      this.applyFilter(this.filterValue);
    }
  }

  // helper moved out as a method to keep lines short and linter-friendly
  private tripleFilterPredicate(data: Triples, filter: string): boolean {
    const f = filter ?? '';
    return this.displayedColumns.some(col => {
      const cell = this.tripleColumns[col].cell(data) || '';
      return cell.toLowerCase().includes(f);
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  toggle(): void {
    this.open = !this.open;
  }

  applyFilter(value: string): void {
    this.filterValue = value?.trim().toLowerCase() ?? '';
    this.dataSource.filter = this.filterValue;
  }

  private isResidue(obj: unknown): obj is Residue {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
    const residue = obj as Partial<Residue>;
    return (
      typeof residue.chainIdentifier === 'string'
      && (typeof residue.residueNumber === 'number'
      || typeof residue.residueNumber === 'string')
      && typeof residue.oneLetterName === 'string'
    );
  }

  private formatResidue(r: unknown): string {
    if (!r) {
      return '';
    }

    if (this.isResidue(r)) {
      const chain = r.chainIdentifier ?? '';
      const name = r.oneLetterName
        ? String(r.oneLetterName).toUpperCase()
        : '';
      const num = r.residueNumber ?? '';
      return `${chain}.${name}${num}`;
    }

    if (typeof r === 'string' || typeof r === 'number') {
      return String(r);
    }

    try {
      return JSON.stringify(r);
    } catch {
      return String(r);
    }
  }
}
