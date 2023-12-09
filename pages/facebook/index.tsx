import { useState } from 'react'

import { type NextPage } from 'next'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import FacebookPost from '@/facebook/components/post'
import { PAGE_FIELDS, POST_FIELDS } from '@/facebook/constants'
import type { PageResponse, Post, PostResponse } from '@/types/facebook'
import { api } from '@/utils/api'

const Dashboard: NextPage = () => {
  const utils = api.useContext()
  const { mutate: initUser } = api.router.initFacebookUser.useMutation()
  const { mutate: savePosts } = api.router.setFacebookPosts.useMutation()
  const { mutate: createPost } = api.router.createFacebookPost.useMutation()
  const { data: posts = [] } = api.router.getFacebookPosts.useQuery()

  const [desireGeneratedPost, setDesireGeneratedPost] = useState<boolean>(false)
  const [generatedPost, setGeneratedPost] = useState<string | null>(null)

  api.router.generateFacebookPost.useQuery(undefined, {
    onSuccess: (res) => {
      setDesireGeneratedPost(false)
      if (res) {
        setGeneratedPost(res)
      }
    },
    enabled: desireGeneratedPost,
  })

  const [syncing, setSyncing] = useState(false)

  return (
    <section className="flex-col gap-8">
      <button
        className="bg-pink-400 self-center text-white w-max rounded-lg hover:bg-[#B05082] hover:shadow-lg relative"
        onClick={() => {
          setSyncing(true)
          new Promise((resolve, reject) => {
            FB.getLoginStatus(({ authResponse }) => {
              if (authResponse) {
                resolve(authResponse)
              } else {
                FB.login(
                  function ({ authResponse }) {
                    if (authResponse) {
                      initUser({
                        id: authResponse.userID,
                        userAccessToken: authResponse.accessToken,
                      })
                      FB.api('/me', function (response) {
                        console.log(
                          'Good to see you, ' +
                            (response as { name: string }).name +
                            '.'
                        )
                        resolve(authResponse)
                      })
                    } else {
                      reject('User cancelled login or did not fully authorize.')
                    }
                  },
                  {
                    // @ts-expect-error
                    config_id: '175893815217274',
                  }
                )
              }
            })
          })
            .then(async () => {
              let allPosts: Parameters<typeof savePosts>[0] = []
              const fbAuthResponse = FB.getAuthResponse()
              if (!fbAuthResponse) {
                console.error('User is not authenticated with Facebook')
              }
              await new Promise((resolve, reject) => {
                FB.api<{ fields: typeof PAGE_FIELDS }, PageResponse>(
                  'me/accounts',
                  { fields: PAGE_FIELDS },
                  (res) => {
                    if (!res || 'error' in res) return reject(res)
                    Promise.all(
                      res.data.map(
                        (page) =>
                          new Promise((resolve, reject) => {
                            FB.api<
                              {
                                access_token: string
                                fields: typeof POST_FIELDS
                              },
                              PostResponse
                            >(
                              'me/posts',
                              {
                                access_token: page.access_token,
                                fields: POST_FIELDS,
                              },
                              (res) => {
                                if (!res || 'error' in res) return reject(res)
                                allPosts = allPosts.concat(
                                  res.data
                                    .filter(
                                      (post): post is Required<Post> =>
                                        !!post.message
                                    )
                                    .map(
                                      ({
                                        created_time: postedAt,
                                        ...rest
                                      }) => ({
                                        ...rest,
                                        postedAt,
                                      })
                                    )
                                )
                                resolve(res)
                              }
                            )
                          })
                      )
                    )
                      .then(() => {
                        savePosts(allPosts)
                        resolve('Success')
                        savePosts(allPosts, {
                          onSuccess: () => {
                            utils.router.getFacebookPosts.invalidate()
                          },
                        })
                      })
                      .catch((e) => {
                        console.error(e)
                        reject(e)
                      })
                  }
                )
              }).catch((e) => {
                console.error(e)
              })
            })
            .catch((e) => {
              console.error(e)
            })
            .finally(() => {
              setSyncing(false)
            })
        }}
      >
        {syncing && (
          <div className="bg-[#B05082] w-full h-full absolute rounded-lg">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <div className="p-4">Sync ↺</div>
      </button>
      {process.env.NODE_ENV === 'development' && (
        <button
          className="bg-pink-400 self-center text-white p-4 w-max rounded-lg hover:bg-[#B05082] hover:shadow-lg relative"
          onClick={() => {
            console.log(FB.getAuthResponse())
          }}
          style={{ display: 'none' }}
        >
          print fb auth status
        </button>
      )}
      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
      {!!posts.length && (
        <button
          className="absolute right-0 bottom-0 bg-pink-400 self-center p-4 m-8 mb-14 text-white w-max rounded-lg hover:bg-[#B05082] hover:shadow-lg"
          onClick={() => {
            setDesireGeneratedPost(true)
          }}
        >
          Generate 🤔
        </button>
      )}
      <Dialog
        open={!!generatedPost}
        onOpenChange={() => {
          setGeneratedPost(null)
        }}
      >
        <DialogContent className="sm:max-w-[425px] w-max rounded-lg">
          <DialogHeader>
            <DialogTitle>Generated post 🔎</DialogTitle>
          </DialogHeader>
          {generatedPost}
          <DialogFooter>
            <button
              type="submit"
              onClick={() => {
                if (!generatedPost) return
                // TODO: Create using generated post (when generated posts have meaningful content)
                createPost(Date(), {
                  onSuccess: () => {
                    utils.router.getFacebookPosts.invalidate()
                  },
                })

                setGeneratedPost(null)
              }}
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Dashboard
