import { Option } from '../models/option/option.model';

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
    key: 'RNAPOLIS',
    label: 'RNApolis Annotator',
  },
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

export const NON_CANONICAL_HANDLING: Option[] = [
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

export const STRUCTURAL_ELEMENTS_HANDLING: Option[] = [
  {
    key: 'USE_PSEUDOKNOTS',
    label: 'Include pseudoknots',
  },
  {
    key: 'IGNORE_PSEUDOKNOTS',
    label: 'Ignore pseudoknots',
  },
];

export const VISUALIZATION_TOOL: Option[] = [
  {
    key: 'RNA_PUZZLER',
    label: 'RNApuzzler',
  },
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
    key: 'NONE',
    label: 'No image',
  },
];
