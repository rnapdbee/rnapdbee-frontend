import { Example } from './example.model';

export enum UploadMethodType {
  FromPDB = 'pdb',
  FromLocalFile = 'file',
  FromExample = 'example'
}

export interface UploadMethod {
  type: UploadMethodType,
  data: string | File | Example | null,
  valid: boolean,
}
