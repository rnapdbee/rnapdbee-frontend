import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, mergeMap, Observable, tap, throwError } from 'rxjs';
import { ApiPaths, environment } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { Params } from '../../models/params/params.model';
import { Example } from '../../models/upload/example.model';
import { UploadMethod } from '../../models/upload/upload-type.model';
import { SnackBarService } from '../notifications/snack-bar.service';
import { FileReaderService } from '../file-validator/file-reader.service';

export abstract class CalculationRequestService<P extends Params, O> {
  get url() { return `${environment.baseUrl}${this.path}`; }

  private readonly _results$ = new BehaviorSubject<Calculation<P, O> | null>(null);
  calculationResults$ = this._results$.asObservable();
  get calculationResults() { return this._results$.getValue(); }
  set calculationResults(value: Calculation<P, O> | null) { this._results$.next(value); }

  constructor(
    private readonly http: HttpClient,
    private readonly fileReader: FileReaderService,
    private readonly snackBar: SnackBarService,
    private readonly path: ApiPaths,
  ) {}

  calculate(params: P, content: UploadMethod): Observable<Calculation<P, O>> {
    return this.performCalculationBasedOnContent(params, content).pipe(tap(data => { this.calculationResults = data; }));
  }

  find(id: string): Observable<Calculation<P, O>> {
    return this.findById(id).pipe(tap(data => { this.calculationResults = data; }));
  }

  reanalyze(id: string, params: P): Observable<Calculation<P, O>> {
    return this.reanalyzeWithDifferentParameters(id, params).pipe(tap(data => { this.calculationResults = data; }));
  }

  protected abstract performCalculationBasedOnContent(params: P, content: UploadMethod): Observable<Calculation<P, O>>;

  protected calculateFromPdb(id: string, paramObject: P): Observable<Calculation<P, O>> {
    const params = new HttpParams({ fromObject: paramObject });
    return this.http.post<Calculation<P, O>>(`${this.url}/pdb/${id}`, null, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 413) {
          this.snackBar.error('Request entity is too large. Maximal size: 100MB.');
        }
        return throwError(() => error);
      }),
    );
  }

  protected calculateFromFile(file: File, paramObject: P): Observable<Calculation<P, O>> {
    const headers = this.getRequestHeaders(file.name);
    const params = new HttpParams({ fromObject: paramObject });
    return this.fileReader.readAsTextFromFile(file).pipe(
      mergeMap(data => this.http.post<Calculation<P, O>>(this.url, data, { params, headers })),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 413) {
          this.snackBar.error('Request entity is too large. Maximal size: 100MB.');
        }
        return throwError(() => error);
      }),
    );
  }

  protected calculateFromExample(example: Example, paramObject: P): Observable<Calculation<P, O>> {
    const headers = this.getRequestHeaders(example.name);
    const params = new HttpParams({ fromObject: paramObject });
    return this.fileReader.readAsTextFromPath(example.path).pipe(
      mergeMap(data => this.http.post<Calculation<P, O>>(this.url, data, { params, headers })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 413) {
          this.snackBar.error('Request entity is too large. Maximal size: 100MB.');
        }
        return throwError(() => error);
      }),
    );
  }

  private findById(id: string): Observable<Calculation<P, O>> {
    return this.http.get<Calculation<P, O>>(`${this.url}/${id}`);
  }

  private reanalyzeWithDifferentParameters(id: string, paramObject: P): Observable<Calculation<P, O>> {
    const params = new HttpParams({ fromObject: paramObject });
    return this.http.post<Calculation<P, O>>(`${this.url}/${id}`, null, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 413) {
          this.snackBar.error('Request entity is too large. Maximal size: 100MB.');
        }
        return throwError(() => error);
      }),
    );
  }

  private getRequestHeaders(filename: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
  }
}
