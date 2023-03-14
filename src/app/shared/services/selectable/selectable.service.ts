import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectableService {
  private readonly _selectable$ = new BehaviorSubject<boolean>(false);
  readonly selectable$ = this._selectable$.asObservable();
  get selectable() { return this._selectable$.getValue(); }
  set selectable(value: boolean) { this._selectable$.next(value); }
}
