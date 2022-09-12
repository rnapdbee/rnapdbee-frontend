import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPaths, environment } from 'src/environments/environment';
import { Calculation } from '../../models/calculation.model';
import { Example } from '../../models/example.model';
import { Params } from '../../models/params.model';

export abstract class CalculationRequestService<P extends Params, O> {
  private readonly path: ApiPaths;
  get url() { return `${environment.baseUrl}${this.path}`; }

  constructor(private readonly http: HttpClient, private readonly _path: ApiPaths) {
    this.path = _path;
  }

  calculateFromPdb(id: string, paramObject: P): Observable<Calculation<P, O>> {
    const params = new HttpParams({ fromObject: paramObject });
    return this.http.post<Calculation<P, O>>(`${this.url}/pdb/${id}`, null, { params });
  }

  calculateFromFile(file: File, paramObject: P): Observable<Calculation<P, O>> {
    const params = new HttpParams({ fromObject: paramObject });
    const fileText = file.name; // TODO: read file as text
    return this.http.post<Calculation<P, O>>(this.url, fileText, { params });
  }

  calculateFromExample(example: Example, paramObject: P): Observable<Calculation<P, O>> {
    const params = new HttpParams({ fromObject: paramObject });
    const exampleText = example.name; // TODO: read example as text
    return this.http.post<Calculation<P, O>>(this.url, exampleText, { params });
  }
}
