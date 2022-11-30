import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-reanalyze-panel',
  templateUrl: './reanalyze-panel.component.html',
  styleUrls: ['./reanalyze-panel.component.scss'],
  animations: [OpenCloseAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: forwardRef(() => ReanalyzePanelComponent),
      multi: true,
    },
  ],
})
export class ReanalyzePanelComponent implements ControlValueAccessor {
  private _expanded = false;

  get expanded() { return this._expanded; }
  set expanded(val: boolean) {
    if (val !== undefined && this._expanded !== val) {
      this._expanded = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  writeValue(value: boolean): void {
    this.expanded = value;
  }

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouch = fn;
  }

  onChange(_: boolean): void {
    // do nothing.
  }

  onTouch(_: boolean): void {
    // do nothing.
  }
}
