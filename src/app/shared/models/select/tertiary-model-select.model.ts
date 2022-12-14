import { SecondaryResultSelect } from './secondary-result-select.model';
import { SelectField } from './select-field.model';
import { SelectFields } from './select-fields.model';
import { SelectObject } from './select-object.model';

export interface TertiaryModelSelectFields extends SelectFields {
  output2D: SecondaryResultSelect,
  messages: SelectField,
  canonicalInteractions: SelectField,
  nonCanonicalInteractions: SelectField,
  interStrandInteractions: SelectField,
  stackingInteractions: SelectField,
  basePhosphateInteractions: SelectField,
  baseRiboseInteractions: SelectField,
}

export class TertiaryModelSelect extends SelectObject<TertiaryModelSelectFields> {
  constructor() {
    super({
      output2D: new SecondaryResultSelect(),
      messages: new SelectField(false),
      canonicalInteractions: new SelectField(false),
      nonCanonicalInteractions: new SelectField(false),
      interStrandInteractions: new SelectField(false),
      stackingInteractions: new SelectField(false),
      basePhosphateInteractions: new SelectField(false),
      baseRiboseInteractions: new SelectField(false),
    });
  }
}
