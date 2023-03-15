import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { OpenCloseAnimation } from '../../animations/open-close';
import { SelectArray } from '../../models/select/select-array.model';
import { SelectSubObject } from '../../models/select/select-fields.model';
import { DownloadService } from '../../services/downlaod/download.service';
import { SnackBarService } from '../../services/notifications/snack-bar.service';
import { SelectableService } from '../../services/selectable/selectable.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
  animations: [OpenCloseAnimation],
})
export class DownloadComponent {
  @Input() selected: SelectArray<SelectSubObject> | undefined;
  @Input() path: ApiPaths | undefined;
  @Input() id: string | undefined;
  expanded = false;
  selectable$: Observable<boolean>;

  constructor(
    private readonly selectableService: SelectableService,
    private readonly downloadService: DownloadService,
    private readonly snackBar: SnackBarService,
  ) {
    this.selectable$ = this.selectableService.selectable$;
  }

  download(): void {
    if (!this.path || !this.id || !this.selected?.getValue()) {
      this.snackBar.error('Could not download your results. Try again.');
      throw new Error('Id, path or payload is undefined');
    }
    this.downloadService
      .download(this.path, this.id, this.selected.getValue())
      .subscribe(() => {
        this.expanded = false;
      });
  }

  enableSelect(): void {
    this.selectableService.selectable = true;
  }

  disableSelect(): void {
    this.selectableService.selectable = false;
  }

  selectAll(): void {
    this.selected?.set(!this.allSelected());
  }

  allSelected(): boolean {
    return this.selected?.isSelectedOrUnactive() ?? false;
  }

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }
}
