import { Injectable } from '@angular/core';
import { ValidationPayload } from '../../models/validation-payload.model';

export const EXTENSIONS = ['cif', 'bpseq', 'ct', 'dbn'] as const;
export type Extension = typeof EXTENSIONS[number];

@Injectable({
  providedIn: 'root',
})
export class ExtensionValidatorService {
  validate(fileExtesion: string | undefined, extensions: Extension[]): ValidationPayload {
    if (!fileExtesion) {
      return {
        valid: false,
        message: 'File extension could not be found.',
      };
    }

    if (!this.isFileExtensionSupported(fileExtesion)) {
      return {
        valid: false,
        message: `.${fileExtesion} files are not supported.`,
      };
    }

    if (!this.isInEnabledExtensions(fileExtesion, extensions)) {
      return {
        valid: false,
        message: 'This file type is incorrect for this scenario.',
      };
    }

    return {
      valid: true,
      message: 'File extension validation passed.',
    };
  }

  private isFileExtensionSupported(fileExtesion: string): boolean {
    return EXTENSIONS.indexOf(fileExtesion as Extension) > -1;
  }

  private isInEnabledExtensions(fileExtesion: string, enabledExtensions: Extension[]): boolean {
    return enabledExtensions.indexOf(fileExtesion as Extension) > -1;
  }
}
