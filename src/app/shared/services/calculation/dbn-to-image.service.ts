import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation.model';
import { DbnToImageParams } from '../../models/dbn-to-image-params.model';
import { Example } from '../../models/example.model';
import { SecondaryOutput } from '../../models/secondary-output.model';
import { UploadMethod, UploadMethodType } from '../../models/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { CalculationRequestService } from './calculation-request.service';

@Injectable({
  providedIn: 'root',
})
export class DbnToImageService extends CalculationRequestService<DbnToImageParams, SecondaryOutput> {
  constructor(http: HttpClient, fileReader: FileReaderService) {
    super(http, fileReader, ApiPaths.Image);
  }

  calculate(params: DbnToImageParams, content: UploadMethod): Observable<Calculation<DbnToImageParams, SecondaryOutput>> {
    switch (content.type) {
      case UploadMethodType.fromExample:
        return this.calculateFromExample(content.data as Example, params);
      case UploadMethodType.fromLocalFile:
        return this.calculateFromFile(content.data as File, params);
      default:
        throw new Error('Upload method type could not be recognized.');
    }
  }

  find(id: string): Observable<Calculation<DbnToImageParams, SecondaryOutput>> {
    return this.findById(id);
  }

  // TODO: reanalyze(id, params) {...}
}
