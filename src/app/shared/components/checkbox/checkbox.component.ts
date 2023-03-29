import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenCloseAnimation } from '../../animations/open-close';
import { SelectField } from '../../models/select/select-field.model';
import { SelectableService } from '../../services/selectable/selectable.service';
import { ControlValueComponent, ControlValueProvider } from '../control-value/control-value.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  animations: [OpenCloseAnimation],
  // eslint-disable-next-line no-use-before-define
  providers: [ControlValueProvider(CheckboxComponent)],
})
export class CheckboxComponent extends ControlValueComponent<SelectField> {
  @Input() label = '';
  @Input() showControls = true;
  @Input() expanded = false;
  @Input() tableView = false;

  selectable$: Observable<boolean>;

  constructor(private readonly selectableService: SelectableService) {
    super(new SelectField(false));
    this.selectable$ = this.selectableService.selectable$;
  }

  override writeValue(value: SelectField): void {
    this.value = value;
    this.value.activateField();
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }
}
