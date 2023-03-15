export interface Selectable {
  set: (value: boolean) => void,
  isSelectedOrUnactive: () => boolean,
  isAnythingSelected: () => boolean,
  getValue: () => object | boolean,
  getSelectedCount: () => number,
}
