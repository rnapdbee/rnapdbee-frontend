import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OpenCloseAnimation } from '../../animations/open-close';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [OpenCloseAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ]
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() showControls = false;
  @Input() expanded = false;
  val: boolean | undefined = undefined;

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  onChange(_: boolean) { }

  onTouch(_: boolean) { }

  set value(val: boolean) {
    if( val !== undefined && this.val !== val){
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }
  get value() { return !!this.val; }

  writeValue(value: boolean){ 
    this.value = value;
  }

  registerOnChange(fn: any){
    this.onChange = fn;
  }

  registerOnTouched(fn: any){
    this.onTouch = fn;
  }
}
