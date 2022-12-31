import { Component, Input } from '@angular/core';
import { SecondaryOutput, StructuralElements } from 'src/app/shared/models/output/secondary-output.model';
import { SecondaryResultSelect } from 'src/app/shared/models/select/secondary-result-select.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';


@Component({
  selector: 'app-secondary-output[output]',
  templateUrl: './secondary-output.component.html',
  styleUrls: ['./secondary-output.component.scss'],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(SecondaryOutputComponent)],
})
export class SecondaryOutputComponent extends ControlValueComponent<SecondaryResultSelect> {
  private _output: SecondaryOutput | undefined;
  @Input() set output(value: SecondaryOutput | undefined) {
    if (value) {
      this.generateOutputTexts(value);
    }
    this._output = value;
  }
  get output() { return this._output; }

  strandsText = '';
  bpSeqText = '';
  ctText = '';
  interactionsText = '';
  structuralElementsText = '';

  constructor() { super(new SecondaryResultSelect()); }

  notEmpty(structuralElements: StructuralElements): boolean {
    if (
      structuralElements.coordinates
      || structuralElements.stems.length > 0
      || structuralElements.loops.length > 0
      || structuralElements.singleStrands.length > 0
      || structuralElements.singleStrands3p.length > 0
      || structuralElements.singleStrands5p.length > 0
    ) {
      return true;
    }
    return false;
  }

  generateOutputTexts(output: SecondaryOutput) {
    this.strandsText = this.getStrandsText(output);
    this.bpSeqText = this.getBpSeqText(output);
    this.ctText = this.getCtText(output);
    this.interactionsText = this.getInteractionsText(output);
    this.structuralElementsText = this.getStructuralElementsText(output);
  }

  private getStrandsText(output: SecondaryOutput): string {
    return output.strands
      .map(strand => `${strand.name}\n`
        + `${strand.sequence}\n`
        + `${strand.structure}\n`)
      .join('\n');
  }

  private getBpSeqText(output: SecondaryOutput): string {
    return output.bpSeq.join('\n');
  }

  private getCtText(output: SecondaryOutput): string {
    return output.ct.join('\n');
  }

  private getInteractionsText(output: SecondaryOutput): string {
    return output.interactions?.join('\n') ?? '';
  }

  private getStructuralElementsText(output: SecondaryOutput): string {
    const stems = output.structuralElements.stems
      .map(line => `Stem ${line}`)
      .join('\n');
    const loops = output.structuralElements.loops
      .map(line => `Loop ${line}`)
      .join('\n');
    const singleStrands = output.structuralElements.singleStrands
      .map(line => `Single strand ${line}`)
      .join('\n');
    const singleStrands5p = output.structuralElements.singleStrands5p
      .map(line => `Single strand 5' ${line}`)
      .join('\n');
    const singleStrands3p = output.structuralElements.singleStrands3p
      .map(line => `Single strand 3' ${line}`)
      .join('\n');
    return [stems, loops, singleStrands, singleStrands5p, singleStrands3p, output.structuralElements.coordinates].join('\n');
  }
}
