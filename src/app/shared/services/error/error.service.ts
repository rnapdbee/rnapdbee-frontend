import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RNApdbeeError } from '../../models/error/error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorMessage(error: Error | HttpErrorResponse): string {
    if (!('error' in error)) {
      return `${error.message}`;
    }
    if (!('message' in error.error)) {
      return `${error.name}: ${error.statusText}`;
    }
    return `${(error.error as RNApdbeeError).message}`;
  }
}
