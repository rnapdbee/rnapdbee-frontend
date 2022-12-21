import { SecondaryResultSelect } from './secondary-result-select.model';
import { SelectFields } from './select-fields.model';
import { SelectObject } from './select-object.model';

export interface MultiEntrySelectFields extends SelectFields {
  output2D: SecondaryResultSelect,
}

export class MultiEntrySelect extends SelectObject<MultiEntrySelectFields> {
  constructor() {
    super({
      output2D: new SecondaryResultSelect(),
    });
  }
}
