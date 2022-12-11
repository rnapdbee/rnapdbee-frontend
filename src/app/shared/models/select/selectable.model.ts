export interface Selectable {
  set: (value: boolean) => void,
  isSelectedOrUnactive: () => boolean,
}
