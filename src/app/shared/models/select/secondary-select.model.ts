import { SecondaryOutput } from '../output/secondary-output.model';
import { Select } from './select.model';

export class SecondarySelect extends Select<SecondaryOutput> {
  constructor() {
    super({
      strands: false,
      bpSeq: false,
      ct: false,
      interactions: false,
      structuralElements: false,
      imageInformation: false,
    });
  }
}
