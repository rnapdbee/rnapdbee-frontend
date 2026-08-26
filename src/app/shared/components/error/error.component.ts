import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: false,
})
export class ErrorComponent {
  @Input() message = '';
  @Input() calculationId: string | undefined = '';
}
