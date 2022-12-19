import { MultiResultSelect } from './multi-result-select.model';
import { SelectArray } from './select-array.model';

export class MultiSelect extends SelectArray<MultiResultSelect> {
  constructor(outputLengths: number[]) {
    const selectArray: MultiResultSelect[] = [];
    outputLengths.forEach(outputLength => {
      selectArray.push(new MultiResultSelect(outputLength));
    });
    super(selectArray);
  }
}
