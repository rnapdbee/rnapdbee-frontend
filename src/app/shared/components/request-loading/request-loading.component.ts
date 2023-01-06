import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestLoadingData, RequestLoadingService } from '../../services/loading/request-loading.service';

@Component({
  selector: 'app-request-loading',
  templateUrl: './request-loading.component.html',
  styleUrls: ['./request-loading.component.scss'],
})
export class RequestLoadingComponent {
  loadingData$: Observable<RequestLoadingData | undefined>;

  constructor(private readonly loadingService: RequestLoadingService) {
    this.loadingData$ = this.loadingService.loadingData$;
  }
}
