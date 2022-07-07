import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Example } from '../../models/example.model';

@Component({
  selector: 'app-example-picker',
  templateUrl: './example-picker.component.html',
  styleUrls: ['./example-picker.component.scss']
})
export class ExamplePickerComponent implements OnInit {

  @Input() examples: Example[] = [];
  @Output() selected = new EventEmitter<Example>();
  current: Example | undefined;
  
  ngOnInit() {
    this.current = this.examples[0];
    this.selected.emit(this.current);
  }

  select(item: Example) {
    this.current = item;
    this.selected.emit(this.current);
  }
}
