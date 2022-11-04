import { Injectable } from '@angular/core';
import { STRUCTURAL_ELEMENTS_HANDLING } from '../../constants/param-options.const';
import { SecondaryToDbnParams } from '../../models/secondary-to-dbn-params.module';


@Injectable({
  providedIn: 'root',
})
export class DescriptionService {
  generateSecondaryDescription(params: SecondaryToDbnParams): string {
    let handling = '';
    let removeIsolated = '';

    if (params.structuralElementsHandling === STRUCTURAL_ELEMENTS_HANDLING[0].key) {
      handling = 'using';
    } else if (params.structuralElementsHandling === STRUCTURAL_ELEMENTS_HANDLING[1].key) {
      handling = 'ignoring';
    }

    if (params.removeIsolated) {
      removeIsolated = 'have been removed';
    } else {
      removeIsolated = 'were not removed';
    }

    return `Structural elements handled ${handling} pseudoknots. 
            Isolated, cannonical base pairs ${removeIsolated}.`;
  }
}
