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
}

interface ImageInformation {
  pathToPNGImage: string,
  pathToSVGImage: string,
  successfulDrawer: string,
  failedDrawer: string,
}

interface SecondaryOutputEntry {
  strands: StrandEntry[],
  bpSeq: string[],
  ct: string[],
  interactions: string[],
  structuralElements: StructuralElements,
  imageInformation: ImageInformation,
}

export interface SecondaryOutput {
  analysis: SecondaryOutputEntry[],
}
