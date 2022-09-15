import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/environments/environment';
import { Calculation } from '../../models/calculation.model';
import { Example } from '../../models/example.model';
import { MultiOutput } from '../../models/multi-output.model';
import { TertiaryToMultiParams } from '../../models/tertiary-to-multi-params.model';
import { UploadMethod, UploadMethodType } from '../../models/upload-type.model';
import { FileReaderService } from '../file-validator/file-reader.service';
import { CalculationRequestService } from './calculation-request.service';

@Injectable({
  providedIn: 'root',
})
export class TertiaryToMultiService extends CalculationRequestService<TertiaryToMultiParams, MultiOutput> {
  constructor(http: HttpClient, fileReader: FileReaderService) {
    super(http, fileReader, ApiPaths.Multi);
  }

  calculate(params: TertiaryToMultiParams, content: UploadMethod): Observable<Calculation<TertiaryToMultiParams, MultiOutput>> {
    switch (content.type) {
      case UploadMethodType.fromPDB:
        return this.calculateFromPdb(content.data as string, params);
      case UploadMethodType.fromExample:
        return this.calculateFromExample(content.data as Example, params);
      case UploadMethodType.fromLocalFile:
        return this.calculateFromFile(content.data as File, params);
      default:
        throw new Error('Upload method type could not be recognized.');
    }
  }
}
