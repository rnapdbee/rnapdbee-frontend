/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { SelectArray } from './select-array.model';
import { SelectField } from './select-field.model';
import { SelectObject } from './select-object.model';

export type SelectSubObject = SelectObject<SelectFields> | SelectArray<SelectObject<SelectFields>>
export type SelectElem = SelectField | SelectSubObject

export interface SelectFields {
  [Property: string]: SelectElem;
}
