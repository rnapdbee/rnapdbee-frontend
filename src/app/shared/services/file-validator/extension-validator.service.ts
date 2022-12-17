import { Injectable } from '@angular/core';
import { FileExtension } from '../../models/file/file-extension.model';
import { ValidationPayload } from '../../models/upload/validation-payload.model';


@Injectable({
  providedIn: 'root',
})
export class ExtensionValidatorService {
  validate(fileExtesion: string | undefined, extensions: FileExtension[]): ValidationPayload {
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
    return Object.values(FileExtension).indexOf(fileExtesion as FileExtension) > -1;
  }

  private isInEnabledExtensions(fileExtesion: string, enabledExtensions: FileExtension[]): boolean {
    return enabledExtensions.indexOf(fileExtesion as FileExtension) > -1;
  }
}
