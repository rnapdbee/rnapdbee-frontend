import { Option } from '../models/option.model';

export const MODEL_SELECTION: Option[] = [
  {
    key: 'FIRST',
    label: 'First model only',
  },
  {
    key: 'ALL',
    label: 'All models',
  },
];

export const ANALYSIS_TOOL: Option[] = [
  {
    key: 'FR3D_PYTHON',
    label: 'FR3D',
  },
  {
    key: 'BPNET',
    label: 'bpnet',
  },
  {
    key: 'BARNABA',
    label: 'baRNAba',
  },
  {
    key: 'RNAVIEW',
    label: 'RNAView',
  },
  {
    key: 'MC_ANNOTATE',
    label: 'MC-Annotate',
  },
];

export const NON_CANONICAL_HANDLING = [
  {
    key: 'VISUALIZATION_ONLY',
    label: 'In visualization only',
  },
  {
    key: 'TEXT_AND_VISUALIZATION',
    label: 'In text and visualization',
  },
  {
    key: 'IGNORE',
    label: 'Do not include',
  },
];

export const STRUCTURAL_ELEMENTS_HANDLING = [
  {
    key: 'USE_PSEUDOKNOTS',
    label: 'Use pseudoknots',
  },
  {
    key: 'IGNORE_PSEUDOKNOTS',
    label: 'Ignore pseudoknots',
  },
];

export const VISUALISATION_TOOL = [
  {
    key: 'VARNA',
    label: 'VARNA',
  },
  {
    key: 'PSEUDO_VIEWER',
    label: 'PseudoViewer',
  },
  {
    key: 'R_CHIE',
    label: 'R-Chie',
  },
  {
    key: 'RNA_GLIB',
    label: 'RNAglib',
  },
  {
    key: 'FORNA',
    label: 'forna',
  },
  {
    key: 'RNA_PUZZLER',
    label: 'RNApuzzler',
  },
  {
    key: 'RNA_TURTLE',
    label: 'RNAturtle',
  },
  {
    key: 'RNA_TRAVELER',
    label: 'RNAtraveler',
  },
  {
    key: 'BARNABA',
    label: 'baRNAba',
  },
  {
    key: 'NONE',
    label: 'No image',
  },
];
