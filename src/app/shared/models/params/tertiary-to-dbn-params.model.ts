import { Params } from './params.model';

export interface TertiaryToDbnParams extends Params {
  modelSelection: string,
  analysisTool: string,
  nonCanonicalHandling: string,
  removeIsolated: boolean,
  structuralElementsHandling: string,
  visualizationTool: string,
}
