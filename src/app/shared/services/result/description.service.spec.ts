import { STRUCTURAL_ELEMENTS_HANDLING, VISUALISATION_TOOL } from '../../constants/param-options.const';
import { SecondaryToDbnParams } from '../../models/params/secondary-to-dbn-params.model';
import { DescriptionService } from './description.service';

describe('DescriptionService', () => {
  let service: DescriptionService;
  let params: SecondaryToDbnParams;

  beforeEach(() => {
    service = new DescriptionService();
    params = {
      removeIsolated: false,
      structuralElementsHandling: STRUCTURAL_ELEMENTS_HANDLING[0].key,
      visualizationTool: VISUALISATION_TOOL[0].key,
    };
  });

  it('covers all structural element options', () => {
    STRUCTURAL_ELEMENTS_HANDLING.forEach(item => {
      params.structuralElementsHandling = item.key;
      expect(() => service.generateSecondaryDescription(params)).not.toThrow();
    });
  });

  it('determines structural element handling using pseudoknots', () => {
    params.structuralElementsHandling = STRUCTURAL_ELEMENTS_HANDLING[0].key;
    const description = service.generateSecondaryDescription(params);
    expect(description).toContain('Structural elements handled using pseudoknots');
  });

  it('determines structural element handling ignoring pseudoknots', () => {
    params.structuralElementsHandling = STRUCTURAL_ELEMENTS_HANDLING[1].key;
    const description = service.generateSecondaryDescription(params);
    expect(description).toContain('Structural elements handled ignoring pseudoknots');
  });

  it('determines removing isolated base pairs', () => {
    params.removeIsolated = true;
    const description = service.generateSecondaryDescription(params);
    expect(description).toContain('Isolated, cannonical base pairs have been removed');
  });

  it('determines not removing isolated base pairs', () => {
    params.removeIsolated = false;
    const description = service.generateSecondaryDescription(params);
    expect(description).toContain('Isolated, cannonical base pairs were not removed');
  });
});
