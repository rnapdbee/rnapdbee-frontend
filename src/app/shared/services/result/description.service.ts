import { Injectable } from '@angular/core';
import { ANALYSIS_TOOL, MODEL_SELECTION, NON_CANONICAL_HANDLING, STRUCTURAL_ELEMENTS_HANDLING } from '../../constants/param-options.const';
import { SecondaryToDbnParams } from '../../models/params/secondary-to-dbn-params.model';
import { TertiaryToDbnParams } from '../../models/params/tertiary-to-dbn-params.model';


@Injectable({
  providedIn: 'root',
})
export class DescriptionService {
  generateSecondaryDescription(params: SecondaryToDbnParams): string {
    const removeIsolated = this.determineRemoveIsolated(params.removeIsolated);
    const structuralElementsHandling = this.determineStructuralElementsHandling(params.structuralElementsHandling);

    return `Structural elements handled ${structuralElementsHandling} pseudoknots. 
            Isolated, cannonical base pairs ${removeIsolated}.`;
  }

  generateTertiaryDescription(params: TertiaryToDbnParams): string {
    const modelSelection = this.determineModelSelection(params.modelSelection);
    const analysisTool = this.determineAnalysisTool(params.analysisTool);
    const nonCanonicalHandling = this.determineNonCanonicalHandling(params.nonCanonicalHandling);
    const removeIsolated = this.determineRemoveIsolated(params.removeIsolated);
    const structuralElementsHandling = this.determineStructuralElementsHandling(params.structuralElementsHandling);

    return `Analyzed ${modelSelection} using ${analysisTool}.
            Non-canonical bps ${nonCanonicalHandling}.
            Structural elements handled ${structuralElementsHandling} pseudoknots.
            Isolated, cannonical base pairs ${removeIsolated}.`;
  }

  private determineNonCanonicalHandling(param: string): string {
    if (param === NON_CANONICAL_HANDLING[0].key) {
      return 'annotated in visualisation only';
    }
    if (param === NON_CANONICAL_HANDLING[1].key) {
      return 'annotated in text and visualisation';
    }
    if (param === NON_CANONICAL_HANDLING[2].key) {
      return 'are not included';
    }
    return '?';
  }

  private determineAnalysisTool(param: string): string {
    const tool = ANALYSIS_TOOL.find(item => item.key === param);
    if (tool) {
      return tool.label;
    }
    return '?';
  }

  private determineModelSelection(param: string): string {
    if (param === MODEL_SELECTION[0].key) {
      return 'first model';
    }
    if (param === MODEL_SELECTION[1].key) {
      return 'all models';
    }
    return '?';
  }

  private determineStructuralElementsHandling(param: string): string {
    if (param === STRUCTURAL_ELEMENTS_HANDLING[0].key) {
      return 'using';
    }
    if (param === STRUCTURAL_ELEMENTS_HANDLING[1].key) {
      return 'ignoring';
    }
    return '?';
  }

  private determineRemoveIsolated(param: boolean): string {
    if (param) {
      return 'have been removed';
    }
    return 'were not removed';
  }
}
