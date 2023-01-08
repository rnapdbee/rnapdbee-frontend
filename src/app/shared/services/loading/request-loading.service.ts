import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RequestLoadingData {
  scenario: string,
  scenarioInfo: string,
  description: string,
}

@Injectable({
  providedIn: 'root',
})
export class RequestLoadingService {
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this._loading$.asObservable();
  set loading(value: boolean) { this._loading$.next(value); }
  get loading(): boolean { return this._loading$.getValue(); }

  private readonly _loadingData$ = new BehaviorSubject<RequestLoadingData | undefined>(undefined);
  readonly loadingData$ = this._loadingData$.asObservable();
  set loadingData(value: RequestLoadingData | undefined) { this._loadingData$.next(value); }
  get loadingData(): RequestLoadingData | undefined { return this._loadingData$.getValue(); }
}
