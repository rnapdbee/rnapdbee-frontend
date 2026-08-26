import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Residue, TertiaryInteractions } from 'src/app/shared/models/output/tertiary-output.model';
import { SelectField } from 'src/app/shared/models/select/select-field.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

type InteractionColumn = {
  [Property: string]: {
    header: string,
    cell: (elem: TertiaryInteractions) => string
    sort: (elem: TertiaryInteractions) => string | number
  }
}

function getResidueStr(residue: Residue): string {
  return `${residue.chainIdentifier}.`
    + `${residue.oneLetterName}`
    + `${residue.residueNumber}`
    + `${residue.insertionCode ?? ''}`;
}

function getBasePair(interactions: TertiaryInteractions): string {
  return `${
    getResidueStr(interactions.leftResidue)
  } - ${
    getResidueStr(interactions.rightResidue)
  }`;
}

const INTERACTION_COLUMNS: InteractionColumn = {
  basePair: {
    header: 'Base pair',
    cell: elem => getBasePair(elem),
    sort: elem => getBasePair(elem),
  },
  interactionType: {
    header: 'Interaction type',
    cell: elem => elem.interactionType,
    sort: elem => elem.interactionType,
  },
  saenger: {
    header: 'Saenger classification',
    cell: elem => `${elem.saenger ?? '-'}`,
    sort: elem => `${elem.saenger ?? '-'}`,
  },
  leontisWesthof: {
    header: 'Leontis-Westhof classification',
    cell: elem => `${elem.leontisWesthof ?? '-'}`,
    sort: elem => `${elem.leontisWesthof ?? '-'}`,
  },
  bPh: {
    header: 'Base phosphate',
    cell: elem => `${elem.bPh ?? '-'}`,
    sort: elem => elem.bPh ?? 0,
  },
  br: {
    header: 'Base ribose',
    cell: elem => `${elem.br ?? '-'}`,
    sort: elem => elem.bPh ?? 0,
  },
  stackingTopology: {
    header: 'Stacking topology',
    cell: elem => `${elem.stackingTopology ?? '-'}`,
    sort: elem => `${elem.stackingTopology ?? '-'}`,
  },
};

@Component({
  selector: 'app-tertiary-interactions[interactions]',
  templateUrl: './tertiary-interactions.component.html',
  styleUrls: ['./tertiary-interactions.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(TertiaryInteractionsComponent)],
})
export class TertiaryInteractionsComponent extends ControlValueComponent<SelectField> implements OnInit, AfterViewInit {
  @Input() interactions: TertiaryInteractions[] | undefined;
  @Input() label = '';
  @ViewChild(MatSort) sort: MatSort | undefined;

  displayedColumns: string[] = [];
  interactionColumns = INTERACTION_COLUMNS;
  dataSource = new MatTableDataSource<TertiaryInteractions>([]);

  private _filterValue = '';
  set filterValue(value: string) {
    this._filterValue = value.trim().toLowerCase();
    this.dataSource.filter = this._filterValue;
  }
  get filterValue() {
    return this._filterValue;
  }

  constructor() { super(new SelectField(false)); }

  ngOnInit(): void {
    if (this.interactions && this.interactions.length > 0) {
      this.displayedColumns = this.getColumnsToDisplay(this.interactions[0]);
      this.dataSource = new MatTableDataSource(this.interactions);
    }
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
      this.dataSource.filterPredicate = this.filterPredicate;
    }
  }

  getColumnsToDisplay(interactions: TertiaryInteractions): string[] {
    const keys = Object.keys(interactions);
    return ['basePair', 'interactionType', ...keys.filter(item => !item.match(/Residue|interactionType/g))];
  }

  private readonly sortingDataAccessor = (item: TertiaryInteractions, sortHeaderId: string)
    : string | number => INTERACTION_COLUMNS[sortHeaderId].sort(item);

  private readonly filterPredicate = (data: TertiaryInteractions, filter: string): boolean => {
    let dataStr = '';
    this.displayedColumns.forEach(column => {
      dataStr += INTERACTION_COLUMNS[column].cell(data).toLocaleLowerCase().replace(/ /g, '');
    });
    return filter.split(' ')
      .map(item => dataStr.includes(item.toLocaleLowerCase()))
      .reduce((previous: boolean, current: boolean) => previous && current, true);
  };
}
