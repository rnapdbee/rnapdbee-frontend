import { Injectable } from '@angular/core';
import { STRUCTURAL_ELEMENTS_HANDLING } from '../../constants/param-options.const';
import { SecondaryToDbnParams } from '../../models/params/secondary-to-dbn-params.model';


@Injectable({
  providedIn: 'root',
})
export class DescriptionService {
  generateSecondaryDescription(params: SecondaryToDbnParams): string {
    const handling = this.determineStructuralElementsHandling(params.structuralElementsHandling);
    const removeIsolated = this.determineRemoveIsolated(params.removeIsolated);

    return `Structural elements handled ${handling} pseudoknots. 
            Isolated, cannonical base pairs ${removeIsolated}.`;
  }

  private determineStructuralElementsHandling(param: string): string {
    if (param === STRUCTURAL_ELEMENTS_HANDLING[0].key) {
      return 'using';
    }
    if (param === STRUCTURAL_ELEMENTS_HANDLING[1].key) {
      return 'ignoring';
    }
    throw new Error('Parameter could not be determined');
  }

  private determineRemoveIsolated(param: boolean): string {
    if (param) {
      return 'have been removed';
    }
    return 'were not removed';
  }
}
