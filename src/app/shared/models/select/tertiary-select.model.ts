import { SelectArray } from './select-array.model';
import { TertiaryResultSelect } from './tertiary-result-select.model';

export class TertiarySelect extends SelectArray<TertiaryResultSelect> {
  constructor(outputLengths: number[]) {
    const selectArray: TertiaryResultSelect[] = [];
    outputLengths.forEach(outputLength => {
      selectArray.push(new TertiaryResultSelect(outputLength));
    });
    super(selectArray);
  }
}
