import { Params } from './params.model';

export interface TertiaryToMultiParams extends Params {
  includeNonCanonical: boolean,
  removeIsolated: boolean,
  visualizationTool: string,
}
