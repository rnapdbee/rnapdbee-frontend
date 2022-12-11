import { SelectField } from './select-field.model';
import { SelectObject } from './select-object.model';

export interface SelectFields {
  [Property: string]: SelectField | SelectObject<SelectFields>;
}
