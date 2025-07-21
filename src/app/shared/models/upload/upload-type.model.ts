import { Example } from './example.model';

export enum UploadMethodType {
  FromPDB = 'pdb',
  FromDotBracket = 'dotbracket',
  FromLocalFile = 'file',
  FromExample = 'example'
}

export interface UploadMethod {
  type: UploadMethodType,
  data: string | File | Example | null,
  valid: boolean,
}
