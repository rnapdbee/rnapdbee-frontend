import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Example } from '../../models/upload/example.model';

@Component({
  selector: 'app-example-picker',
  templateUrl: './example-picker.component.html',
  styleUrls: ['./example-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class ExamplePickerComponent implements OnInit {
  @Input() examples: Example[] = [];
  @Output() selected = new EventEmitter<Example>();
  current: Example | undefined;

  ngOnInit(): void {
    this.current = this.examples[0];
    // Defer the initial emit to a microtask so it runs after Angular's initial
    // change detection pass completes. Emitting synchronously here can cause
    // parent components that react to `selected` by mutating their own bound
    // state (e.g. switching an upload mode) to trigger
    // ExpressionChangedAfterItHasBeenCheckedError.
    void Promise.resolve().then(() => this.selected.emit(this.current));
  }

  select(item: Example): void {
    this.current = item;
    this.selected.emit(this.current);
  }
}
