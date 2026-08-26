import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  standalone: false,
})
export class StepComponent {
  @Input() value = 1;
}
