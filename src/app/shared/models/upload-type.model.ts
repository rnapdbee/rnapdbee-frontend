import { Example } from './example.model';

export enum UploadMethodType {
  fromPDB = 'pdb',
  fromLocalFile = 'file',
  fromExample = 'example'
}

export interface UploadMethod {
  type: UploadMethodType,
  data: string | File | Example | null,
  valid: boolean,
}
