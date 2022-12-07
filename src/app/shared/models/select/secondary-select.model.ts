import { Select, SelectFields } from './select.model';

export interface SecondarySelectFields extends SelectFields {
  strands: boolean,
  bpSeq: boolean,
  ct: boolean,
  interactions: boolean,
  structuralElements: boolean,
  imageInformation: boolean,
}

export class SecondarySelect extends Select<SecondarySelectFields> {
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
