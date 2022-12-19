import { SecondaryOutput } from './secondary-output.model';

export interface OutputMultiEntry {
  output2D: SecondaryOutput,
  adapterEnums: string[],
}

export interface ConsensualVisualization {
  pathToSVGImage: string,
}

export interface MultiOutput {
  title?: string,
  entries: OutputMultiEntry[],
  consensualVisualization: ConsensualVisualization,
}
