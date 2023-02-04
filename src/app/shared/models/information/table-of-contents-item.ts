export interface TableOfContentsItem {
  name: string,
  link: string,
}

export type TableOfContentsEntry = TableOfContentsItem & {
  children: TableOfContentsItem[]
}
