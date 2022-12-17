import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation/calculation.model';
import { TertiaryOutput } from '../../models/output/tertiary-output.model';
import { TertiaryToDbnParams } from '../../models/params/tertiary-to-dbn-params.model';
import { Example } from '../../models/upload/example.model';
import { UploadMethod, UploadMethodType } from '../../models/upload/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { CalculationRequestService } from './calculation-request.service';

@Injectable({
  providedIn: 'root',
})
export class TertiaryToDbnService extends CalculationRequestService<TertiaryToDbnParams, TertiaryOutput> {
  constructor(http: HttpClient, fileReader: FileReaderService) {
    super(http, fileReader, ApiPaths.Tertiary);
  }

  performCalculationBasedOnContent(params: TertiaryToDbnParams, content: UploadMethod)
    : Observable<Calculation<TertiaryToDbnParams, TertiaryOutput>> {
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
}
