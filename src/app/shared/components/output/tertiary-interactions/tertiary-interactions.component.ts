import { Component, Input } from '@angular/core';
import { TertiaryInteractions } from 'src/app/shared/models/output/tertiary-output.model';
import { ControlValueComponent } from '../../control-value/control-value.component';

@Component({
  selector: 'app-tertiary-interactions[interactions]',
  templateUrl: './tertiary-interactions.component.html',
  styleUrls: ['./tertiary-interactions.component.scss'],
})
export class TertiaryInteractionsComponent extends ControlValueComponent<boolean> {
  @Input() interactions: TertiaryInteractions[] | undefined;

  constructor() {
    super(false);
  }
}
