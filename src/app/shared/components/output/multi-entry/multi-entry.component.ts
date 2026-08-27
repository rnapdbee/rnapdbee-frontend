import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ANALYSIS_TOOL } from 'src/app/shared/constants/param-options.const';
import { OutputMultiEntry } from 'src/app/shared/models/output/multi-output.model';
import { MultiEntrySelect } from 'src/app/shared/models/select/multi-entry-select.model';
import { ControlValueComponent, ControlValueProvider } from '../../control-value/control-value.component';

@Component({
  selector: 'app-multi-entry[entry]',
  templateUrl: './multi-entry.component.html',
  styleUrls: ['./multi-entry.component.scss'],
   
  providers: [ControlValueProvider(MultiEntryComponent)],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class MultiEntryComponent extends ControlValueComponent<MultiEntrySelect> {
  @Input() entry: OutputMultiEntry | undefined;
  @Input() index: number | undefined;

  constructor() { super(new MultiEntrySelect()); }

  getAdapterNames(rawNames: string[]): string {
    return rawNames
      .map(name => ANALYSIS_TOOL.find(item => item.key === name)?.label ?? name)
      .join(', ');
  }
}
