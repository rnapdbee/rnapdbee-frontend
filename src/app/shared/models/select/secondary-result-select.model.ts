import { SelectField } from './select-field.model';
import { SelectFields } from './select-fields.model';
import { SelectObject } from './select-object.model';

export interface SecondaryResultSelectFields extends SelectFields {
  strands: SelectField,
  bpSeq: SelectField,
  ct: SelectField,
  interactions: SelectField,
  structuralElements: SelectField,
  imageInformation: SelectField,
}

export class SecondaryResultSelect extends SelectObject<SecondaryResultSelectFields> {
  constructor() {
    super({
      strands: new SelectField(false),
      bpSeq: new SelectField(false),
      ct: new SelectField(false),
      interactions: new SelectField(false),
      structuralElements: new SelectField(false),
      imageInformation: new SelectField(false),
    });
  }
}
