export interface WeblogoLegendEntry {
  description: string,
  symbol: string,
  color: string,
}

export const WEBLOGO_LEGEND_ENTRIES: WeblogoLegendEntry[] = [
  {
    description: 'Unpaired residue',
    symbol: 'U',
    color: '#000000',
  },
  {
    description: 'Missing residue',
    symbol: 'Z',
    color: '#000000',
  },
  {
    description: 'Base pair',
    symbol: '()',
    color: '#808080',
  },
  {
    description: '1st order pseudoknot',
    symbol: '[]',
    color: '#2E7012',
  },
  {
    description: '2nd order pseudoknot',
    symbol: '{}',
    color: '#0F205F',
  },
  {
    description: '3rd order pseudoknot',
    symbol: '<>',
    color: '#831300',
  },
  {
    description: '4th order pseudoknot',
    symbol: 'Aa',
    color: '#550B5B',
  },
  {
    description: '5th order pseudoknot',
    symbol: 'Bb',
    color: '#4A729D',
  },
  {
    description: '6th order pseudoknot',
    symbol: 'Cc',
    color: '#8B7605',
  },
  {
    description: '7th order pseudoknot',
    symbol: 'Dd',
    color: '#C565CF',
  },
  {
    description: '8th order pseudoknot',
    symbol: 'Ee',
    color: '#9FB925',
  },
];
