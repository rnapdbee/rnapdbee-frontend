import { SelectArray } from './select-array.model';
import { TertiaryModelSelect } from './tertiary-model-select.model';

export class TertiaryResultSelect extends SelectArray<TertiaryModelSelect> {
  constructor(length: number) {
    const selectArray: TertiaryModelSelect[] = [];
    for (let i = 0; i < length; i += 1) {
      selectArray.push(new TertiaryModelSelect());
    }
    super(selectArray);
  }

  override getValue(): object {
    return {
      models: this.fields.map(elem => elem.getValue()),
    };
  }
}
