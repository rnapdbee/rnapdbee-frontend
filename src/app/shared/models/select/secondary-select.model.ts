import { SecondaryResultSelect } from './secondary-result-select.model';
import { SelectArray } from './select-array.model';

export class SecondarySelect extends SelectArray<SecondaryResultSelect> {
  constructor(length: number) {
    const selectArray: SecondaryResultSelect[] = [];
    for (let i = 0; i < length; i += 1) {
      selectArray.push(new SecondaryResultSelect());
    }
    super(selectArray);
  }
}
