import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private readonly http: HttpClient) { }

  download(path: ApiPaths, id: string) {
    // TODO: adjust api call for backend
    this.http.get(this.getUrl(path, id), { responseType: 'arraybuffer' as 'json' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        const blob = new Blob([data], { type: 'application/zip' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', `result-${id}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  }

  private getUrl(path: ApiPaths, id: string): string {
    return `${environment.baseUrl}/download${path}/${id}`;
  }
}
