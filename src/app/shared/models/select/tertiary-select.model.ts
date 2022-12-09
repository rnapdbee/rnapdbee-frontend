import { SecondarySelect } from './secondary-select.model';
import { Select, SelectFields } from './select.model';

export interface TertiaryModelSelectFields extends SelectFields {
  output2D: SecondarySelect,
  messages: boolean,
  canonicalInteractions: boolean,
  nonCanonicalInteractions: boolean,
  interStrandInteractions: boolean,
  stackingInteractions: boolean,
  basePhosphateInteractions: boolean,
  baseRiboseInteractions: boolean,
}

export class TertiaryModelSelect extends Select<TertiaryModelSelectFields> {
  constructor() {
    super({
      output2D: new SecondarySelect(),
      messages: false,
      canonicalInteractions: false,
      nonCanonicalInteractions: false,
      interStrandInteractions: false,
      stackingInteractions: false,
      basePhosphateInteractions: false,
      baseRiboseInteractions: false,
    });
  }
}
