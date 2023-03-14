type FacebookPageFields = 'id' | 'name' | 'access_token'
type FacebookPostFields = 'id' | 'message' | 'created_time'

export type FacebookPage<TFields extends FacebookPageFields> = {
  id: string
  name: TFields extends 'name' ? string : never
  access_token: TFields extends 'access_token' ? string : never
}
export type FacebookPost<TFields extends FacebookPostFields> = {
  id: string
  created_time: TFields extends 'created_time' ? string : never
  message?: TFields extends 'created_time' ? string : never
}

export type FacebookResponse<TNode extends Object> = {
  data: TNode[]
  paging?: { cursors: { before: string; after: string } }
} | void
