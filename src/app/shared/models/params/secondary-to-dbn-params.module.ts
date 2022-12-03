import { Params } from './params.model';

export interface SecondaryToDbnParams extends Params {
  removeIsolated: boolean,
  structuralElementsHandling: string,
  visualizationTool: string,
}
