import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  constructor(private readonly http: HttpClient) {}
  private readonly reader = new FileReader();

  readAsArray(file: File): Observable<string[]> {
    this.reader.readAsText(file);

    return new Observable<string[]>((observer: Subscriber<string[]>): void => {
      this.reader.onload = (progressEvent: ProgressEvent<FileReader>): void => {
        const result = progressEvent.target?.result?.toString();
        if (result) {
          observer.next(result.split(/\r\n|\n/));
          observer.complete();
        } else {
          observer.error('File could not be read properly');
        }
      };

      this.reader.onerror = (): void => {
        observer.error('File could not be loaded properly');
      };
    });
  }

  readAsTextFromFile(file: File): Observable<string> {
    this.reader.readAsText(file);
    return new Observable<string>((observer: Subscriber<string>): void => {
      this.reader.onload = (progressEvent: ProgressEvent<FileReader>): void => {
        const result = progressEvent.target?.result?.toString();
        if (result) {
          observer.next(result);
          observer.complete();
        } else {
          observer.error('File could not be read properly');
        }
      };

      this.reader.onerror = (): void => {
        observer.error('File could not be loaded properly');
      };
    });
  }

  readAsTextFromPath(path: string): Observable<string> {
    return this.http.get(path, { responseType: 'text' });
  }
}
