import { Component, Input } from '@angular/core';
import { Triples, Residue } from 'src/app/shared/models/output/tertiary-output.model';

@Component({
  selector: 'app-triples-table',
  templateUrl: './triples-table.component.html',
  styleUrls: ['./triples-table.component.scss'],
})
export class TriplesTableComponent {
  @Input() triples: Triples[] = [];

  // compute superset of keys across triples to handle varied objects
  get columns(): string[] {
    if (!this.triples || this.triples.length === 0) return [];
    const keys = new Set<string>();
    this.triples.forEach(t => Object.keys(t as any).forEach(k => keys.add(k)));
    return Array.from(keys);
  }

  trackByIndex(_: number) {
    return _;
  }

  private isResidue(obj: any): obj is Residue {
    return (
      obj &&
      typeof obj.chainIdentifier === 'string' &&
      (typeof obj.residueNumber === 'number' || typeof obj.residueNumber === 'string') &&
      typeof obj.oneLetterName === 'string'
    );
  }

  private formatResidue(r: Residue): string {
    const letter = r.oneLetterName ? r.oneLetterName.toUpperCase() : '';
    return `${letter} (${r.chainIdentifier}${r.residueNumber})`;
  }

  // helper to safely get a property by name (avoids `(t as any)[col]` in template)
  cellValue(item: Triples, col: string): any {
    return (item as unknown as Record<string, any>)[col];
  }

  formatValue(val: any): string {
    if (val == null) return '';
    if (Array.isArray(val)) {
      // if array of residues, format each nicely
      if (val.length > 0 && this.isResidue(val[0])) {
        return val.map(v => this.formatResidue(v)).join(', ');
      }
      return val.map(v => this.formatValue(v)).join(', ');
    }
    if (this.isResidue(val)) {
      return this.formatResidue(val);
    }
    if (typeof val === 'object') {
      // try to detect nested residue-like objects inside
      const keys = Object.keys(val);
      if (keys.includes('oneLetterName') && keys.includes('chainIdentifier')) {
        return this.formatResidue(val as Residue);
      }
      return JSON.stringify(val);
    }
    return String(val);
  }
}