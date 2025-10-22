import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
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
  @Input() label = 'Base Triples';

  @ViewChild(MatSort) sort: MatSort | null = null;

  filterValue = '';
  open = true;

  displayedColumns = ['residue', 'type', 'firstPartner', 'secondPartner'];

  dataSource = new MatTableDataSource<Triples>([]);

  // mapping for headers and cell renderers used by the template
  tripleColumns: Record<string, { header: string; cell: (t: Triples) => string }> = {
    residue: { header: 'Residue', cell: (t) => this.formatResidue((t as any).residue) },
    type: { header: 'Type', cell: (t) => (t as any).type ?? '' },
    firstPartner: { header: 'First Partner', cell: (t) => this.formatResidue((t as any).firstPartner) },
    secondPartner: { header: 'Second Partner', cell: (t) => this.formatResidue((t as any).secondPartner) },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triples']) {
      this.dataSource.data = this.triples ?? [];
      // set predicate to search across displayed columns using the cell renderers
      this.dataSource.filterPredicate = (data: Triples, filter: string) =>
        this.displayedColumns.some(col =>
          (this.tripleColumns[col].cell(data) || '').toLowerCase().includes(filter),
        );
      this.applyFilter(this.filterValue);
    }
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
    this.filterValue = value ?? '';
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  private isResidue(obj: any): obj is Residue {
    return (
      obj &&
      typeof obj.chainIdentifier === 'string' &&
      (typeof obj.residueNumber === 'number' || typeof obj.residueNumber === 'string') &&
      typeof obj.oneLetterName === 'string'
    );
  }

  private formatResidue(r: any): string {
    if (!r) return '';
    if (this.isResidue(r)) {
      const chain = r.chainIdentifier ?? '';
      const name = r.oneLetterName ? String(r.oneLetterName).toUpperCase() : '';
      const num = r.residueNumber ?? '';
      return `${chain}.${name}${num}`;
    }
    // handle cases where residue is a string or simple value
    if (typeof r === 'string' || typeof r === 'number') return String(r);
    // fallback to JSON
    try { return JSON.stringify(r); } catch { return String(r); }
  }
}