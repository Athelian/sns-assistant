import { PAGE_FIELDS, POST_FIELDS } from '@/facebook/constants'

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

export type FacebookError = {
  error: {
    code: number
    error_subcode: number
    fbtrace_id: string
    message: string
    type: string
  }
}

export type Page = FacebookPage<(typeof PAGE_FIELDS)[number]>
export type Post = FacebookPost<(typeof POST_FIELDS)[number]>
export type PageResponse = FacebookResponse<Page>
export type PostResponse = FacebookResponse<Post>

export type FacebookResponse<TNode extends Object> =
  | {
      data: TNode[]
      paging?: { cursors: { before: string; after: string } }
    }
  | FacebookError
  | void
