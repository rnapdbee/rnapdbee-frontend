export interface TeriaryToDBNPayload {
  fileContent: string,
  modelSelection: ModelSelection,
  analisysTool: AnalisysTool,
  nonCanonicalHandling: NonCanonicalHandling,
  removeIsolated: boolean,
  structuralElementsHandling: StructuralElementsHandling,
  visualizationTool: VisualizationTool,
}

export enum ModelSelection {
  First = 'First',
  All = 'All',
}

export enum AnalisysTool {
  fr3dPython = 'fr3d-python', 
  bpnet = 'bpnet',
  baRNAba = 'baRNAba', 
  RNAView = 'RNAView',
  MCAnnotate = 'MC-Annotate',
}

export enum NonCanonicalHandling {
  VisualizationOnly = 'VisualizationOnly',
  TextAndVisualization = 'TextAndVisualization',
  Ignore = 'Ignore',
}

export enum StructuralElementsHandling {
  UsePseudoknots = 'UsePseudoknots',
  IgnorePseudoknots = 'IgnorePseudoknots',
}

export enum VisualizationTool {
  VARNA = 'VARNA',
  PseudoViewer = 'PseudoViewer',
  RChie = 'R-Chie',
  RNAglib = 'RNAglib',
  forna = 'forna',
  RNApuzzler = 'RNApuzzler',
  RNAturtle = 'RNAturtle',
  RNAtraveler = 'RNAtraveler',
  baRNAba = 'baRNAba',
  None = 'None',
}
