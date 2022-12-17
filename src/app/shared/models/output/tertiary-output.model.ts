import { SecondaryOutput } from './secondary-output.model';

export interface Residue {
  chainIdentifier: string,
  residueNumber: number,
  insertionCode?: string,
  oneLetterName: string,
}

export interface TertiaryInteractions {
  interactionType: string,
  saenger?: string,
  leontisWesthof?: string,
  bPh?: number,
  br?: number,
  leftResidue: Residue,
  rightResidue: Residue,
  stackingTopology?: string,
}

export interface TertiaryModel {
  modelNumber: number,
  output2D: SecondaryOutput,
  messages: string[],
  canonicalInteractions: TertiaryInteractions[],
  nonCanonicalInteractions: TertiaryInteractions[],
  interStrandInteractions: TertiaryInteractions[],
  stackingInteractions: TertiaryInteractions[],
  basePhosphateInteractions: TertiaryInteractions[],
  baseRiboseInteractions: TertiaryInteractions[],
}

export interface TertiaryOutput {
  title?: string,
  models: TertiaryModel[],
}
