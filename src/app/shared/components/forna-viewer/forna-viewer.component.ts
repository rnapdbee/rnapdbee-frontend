import { Component, Input } from '@angular/core';
import { StrandEntry } from '../../models/output/secondary-output.model';

@Component({
  selector: 'app-forna-viewer[strands]',
  templateUrl: './forna-viewer.component.html',
  styleUrls: ['./forna-viewer.component.scss'],
})
export class FornaViewerComponent {
  @Input() strands: StrandEntry[] = [];
  private readonly baseUrl = 'http://nibiru.tbi.univie.ac.at/forna/forna.html';
  private readonly name = '>strand_combined';

  private get sequence(): string {
    return this.strands
      .map(item => item.sequence)
      .reduce((previous: string, current: string) => `${previous}${current}`);
  }

  private get structure(): string {
    return this.strands
      .map(item => item.structure)
      .reduce((previous: string, current: string) => `${previous}${current}`)
      .replace(/[^.(){}[\]]/g, '.');
  }

  get url(): string {
    return `${this.baseUrl}?id=fasta&file=${this.name}\\n${this.sequence}\\n${this.structure}`;
  }
}
