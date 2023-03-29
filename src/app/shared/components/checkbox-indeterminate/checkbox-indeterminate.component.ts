import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectableService } from '../../services/selectable/selectable.service';

@Component({
  selector: 'app-checkbox-indeterminate',
  templateUrl: './checkbox-indeterminate.component.html',
  styleUrls: ['./checkbox-indeterminate.component.scss'],
})
export class CheckboxIndeterminateComponent {
  @Input() checked = false;
  @Input() indeterminate = false;
  @Output() _change = new EventEmitter<boolean>();

  selectable$: Observable<boolean>;

  constructor(private readonly selectableService: SelectableService) {
    this.selectable$ = this.selectableService.selectable$;
  }

  handleChange(event: boolean) {
    this._change.emit(event);
  }
}
