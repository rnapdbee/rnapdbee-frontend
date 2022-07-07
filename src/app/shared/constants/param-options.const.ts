import { Option } from "../models/option.model";

export const ModelSelection: Option[] = [
  {
    key: 'First',
    label: 'First models only',
  },
  {
    key: 'All',
    label: 'All models',
  },
];

export const AnalisysTool: Option[] = [ 
  {
    key: 'fr3d-python', 
    label: 'FR3D',
  },
  {
    key: 'bpnet',
    label: 'bpnet',
  },
  {
    key: 'baRNAba', 
    label: 'baRNAba',
  },
  {
    key: 'RNAView',
    label: 'RNAView',
  },
  {
    key: 'MC-Annotate',
    label: 'MC-Annotate',
  },
];

export const NonCanonicalHandling = [
  {
    key: 'VisualizationOnly',
    label: 'In visualization only',
  },
  {
    key: 'TextAndVisualization',
    label: 'In text and visualization',
  },
  {
    key: 'Ignore',
    label: 'Do not include',
  },
];

export const StructuralElementsHandling = [
  {
    key: 'UsePseudoknots',
    label: 'Use pseudoknots',
  },
  {
    key: 'IgnorePseudoknots',
    label: 'Ignore pseudoknots',
  },
];

export const VisualizationTool = [
  {
    key: 'VARNA',
    label: 'VARNA',
  },
  {
    key: 'PseudoViewer',
    label: 'PseudoViewer',
  },
  {
    key: 'R-Chie',
    label: 'R-Chie',
  },
  {
    key: 'RNAglib',
    label: 'RNAglib',
  },
  {
    key: 'forna',
    label: 'forna',
  },
  {
    key: 'RNApuzzler',
    label: 'RNApuzzler',
  },
  {
    key: 'RNAturtle',
    label: 'RNAturtle',
  },
  {
    key: 'RNAtraveler',
    label: 'RNAtraveler',
  },
  {
    key: 'baRNAba',
    label: 'baRNAba',
  },
  {
    key: 'None',
    label: 'No image',
  },
];
