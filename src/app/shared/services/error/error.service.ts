import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RNApdbeeError } from '../../models/error/error.model';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getErrorMessage(error: Error | HttpErrorResponse): string {
    if ('error' in error) { // HttpErrorResponse
      if ('message' in error.error) {
        return `${(error.error as RNApdbeeError).message}`;
      }
      return `${error.name}: ${error.statusText}`;
    }
    return `${error.message}`;
  }
}
