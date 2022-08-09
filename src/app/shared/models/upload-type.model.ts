import { Example } from "./example.model";

export interface UploadMethod {
  type: UploadMethodType,
  data: string | File | Example | null,
  valid: boolean,
}

export enum UploadMethodType {
  fromPDB = 'pdb',
  fromLocalFile = 'file',
  fromExample = 'example'
}
