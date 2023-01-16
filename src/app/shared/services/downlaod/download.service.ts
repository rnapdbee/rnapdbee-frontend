import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { SnackBarService } from '../notifications/snack-bar.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: SnackBarService,
    private readonly errorService: ErrorService,
  ) { }

  download(path: ApiPaths, id: string, body: object) {
    this.http.post<Blob>(this.getUrl(path, id), body, { responseType: 'arraybuffer' as 'json', observe: 'response' })
      .subscribe({
        next: (response: HttpResponse<Blob>) => {
          if (!response.body) {
            this.snackBar.error('Unexpected error while downloading your results. Please try again.');
            return;
          }

          const blob = new Blob([response.body], { type: 'application/zip' });
          const contentDispositionHeader = response.headers.get('content-disposition');
          const filename = this.getFilenameFormContentDisposition(contentDispositionHeader);

          this.saveOnComputer(blob, filename);
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.error(this.errorService.getErrorMessage(error));
        },
      });
  }

  private getUrl(path: ApiPaths, id: string): string {
    return `${environment.baseUrl}/download${path}/${id}`;
  }

  private getFilenameFormContentDisposition(value: string | null): string {
    const filename = value?.split(';')[1].split('filename')[1].split('=')[1].trim().replace(/"/g, '');
    return filename || 'results.zip';
  }

  private saveOnComputer(blob: Blob, filename: string): void {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
}
