interface StrandEntry {
  name: string,
  sequence: string,
  structure: string,
}

interface StructuralElements {
  stems: string[],
  loops: string[],
  singleStrands: string[],
  singleStrands5p: string[],
  singleStrands3p: string[],
  coordinates?: string,
}

export enum DrawingResult {
  DoneByMainDrawer = 'DONE_BY_MAIN_DRAWER',
  DoneByBackupDrawer = 'DONE_BY_BACKUP_DRAWER',
  FailedByBothDrawers = 'FAILED_BY_BOTH_DRAWERS',
  NotDrawn = 'NOT_DRAWN'
}

interface ImageInformation {
  pathToSVGImage: string,
  successfulVisualizationTool: string,
  failedVisualizationTool: string,
  drawingResult: DrawingResult,
}

export interface SecondaryOutput {
  strands: StrandEntry[],
  bpSeq: string[],
  ct: string[],
  interactions: string[],
  structuralElements: StructuralElements,
  imageInformation: ImageInformation,
}
