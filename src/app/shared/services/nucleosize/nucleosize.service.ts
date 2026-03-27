import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface NucleoSizeResponse {
  pdbid: string;
  total_na_length: number;
}

@Injectable({
  providedIn: 'root',
})
export class NucleoSizeService {
  constructor(private readonly http: HttpClient) {}

  getNucleicAcidLength(pdbId: string): Observable<NucleoSizeResponse> {
    return this.http.get<NucleoSizeResponse>(`${environment.nucleoSizeUrl}/api/${pdbId}`);
  }
}
