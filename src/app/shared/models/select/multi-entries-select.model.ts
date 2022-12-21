import { MultiEntrySelect } from './multi-entry-select.model';
import { SelectArray } from './select-array.model';

export class MultiEntriesSelect extends SelectArray<MultiEntrySelect> {
  constructor(length: number) {
    const selectArray: MultiEntrySelect[] = [];
    for (let i = 0; i < length; i += 1) {
      selectArray.push(new MultiEntrySelect());
    }
    super(selectArray);
  }
}
