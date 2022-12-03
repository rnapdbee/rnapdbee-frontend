import { SecondaryFlags } from './secondary-flags.model';

export class TertiaryModelFlags {
  modelNumber = false;
  output2D = new SecondaryFlags();
  messages = false;
  canonicalInteractions = false;
  nonCanonicalInteractions = false;
  interStrandInteractions = false;
  stackingInteractions = false;
  basePhosphateInteractions = false;
  baseRiboseInteractions = false;
}
