import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { MultiOutput } from '../../models/output/multi-output.model';
import { TertiaryToMultiParams } from '../../models/params/tertiary-to-multi-params.model';
import { Example } from '../../models/upload/example.model';
import { UploadMethod, UploadMethodType } from '../../models/upload/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { CalculationRequestService } from './calculation-request.service';

@Injectable({
  providedIn: 'root',
})
export class TertiaryToMultiService extends CalculationRequestService<TertiaryToMultiParams, MultiOutput> {
  constructor(http: HttpClient, fileReader: FileReaderService) {
    super(http, fileReader, ApiPaths.Multi);
  }

  performCalculationBasedOnContent(params: TertiaryToMultiParams, content: UploadMethod)
    : Observable<Calculation<TertiaryToMultiParams, MultiOutput>> {
    switch (content.type) {
      case UploadMethodType.FromPDB:
        return this.calculateFromPdb(content.data as string, params);
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
