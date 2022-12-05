import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { SecondaryOutput } from '../../models/output/secondary-output.model';
import { SecondaryToDbnParams } from '../../models/params/secondary-to-dbn-params.model';
import { Example } from '../../models/upload/example.model';
import { UploadMethod, UploadMethodType } from '../../models/upload/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { CalculationRequestService } from './calculation-request.service';


@Injectable({
  providedIn: 'root',
})
export class SecondaryToDbnService extends CalculationRequestService<SecondaryToDbnParams, SecondaryOutput> {
  constructor(http: HttpClient, fileReader: FileReaderService) {
    super(http, fileReader, ApiPaths.Secondary);
  }

  performCalculationBasedOnContent(params: SecondaryToDbnParams, content: UploadMethod)
    : Observable<Calculation<SecondaryToDbnParams, SecondaryOutput>> {
    switch (content.type) {
      case UploadMethodType.FromExample:
        return this.calculateFromExample(content.data as Example, params);
      case UploadMethodType.FromLocalFile:
        return this.calculateFromFile(content.data as File, params);
      default:
        throw new Error('Upload method type could not be recognized.');
    }
  }

  // TODO: reanalyze(id, params) {...}
}
