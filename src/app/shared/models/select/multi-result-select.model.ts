import { MultiEntriesSelect } from './multi-entries-select.model';
import { SelectField } from './select-field.model';
import { SelectFields } from './select-fields.model';
import { SelectObject } from './select-object.model';

export interface MultiResultSelectFields extends SelectFields {
  consensualVisualization: SelectField,
  entries: MultiEntriesSelect,
}

export class MultiResultSelect extends SelectObject<MultiResultSelectFields> {
  constructor(length: number) {
    super({
      consensualVisualization: new SelectField(false),
      entries: new MultiEntriesSelect(length),
    });
  }
}
