/* eslint-disable import/no-cycle */
import { SelectArray } from './select-array.model';
import { SelectField } from './select-field.model';
import { SelectObject } from './select-object.model';

export interface SelectFields {
  [Property: string]: SelectField | SelectObject<SelectFields> | SelectArray<SelectObject<SelectFields>>;
}
