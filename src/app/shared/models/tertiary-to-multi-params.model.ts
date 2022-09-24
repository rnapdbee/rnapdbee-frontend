import { Params } from './params.model';

export interface TertiaryToMultiParams extends Params {
  modelSelection: string,
  includeNonCanonical: boolean,
  removeIsolated: boolean,
  visualizationTool: string,
}
