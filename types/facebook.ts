type FacebookPostFields = 'message' | 'created_time'

export type FacebookPost<TFields extends FacebookPostFields> = {
  id: string
  created_time: TFields extends 'created_time' ? string : never
  message?: TFields extends 'created_time' ? string : never
}

export type FacebookResponse<TNode extends Object> = {
  data: TNode[]
  paging?: { next: string; previous: string }
} | void
