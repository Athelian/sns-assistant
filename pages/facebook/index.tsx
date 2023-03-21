import { useState } from 'react'

import { type NextPage } from 'next'

import FacebookPost from '@/facebook/components/post'
import { PAGE_FIELDS, POST_FIELDS } from '@/facebook/constants'
import type { PageResponse, Post, PostResponse } from '@/types/facebook'
import { api } from '@/utils/api'

const Dashboard: NextPage = () => {
  const { mutate } = api.example.setFacebookPosts.useMutation()
  const { data: posts = [] } = api.example.getFacebookPosts.useQuery()

  const [syncing, setSyncing] = useState(false)

  return (
    <section className="flex-col">
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
              let allPosts: Parameters<typeof mutate>[0] = []
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
                        mutate(allPosts)
                        resolve('Success')
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
        <div className="p-4">Sync FB posts</div>
      </button>
      {process.env.NODE_ENV === 'development' && (
        <button
          className="bg-pink-400 self-center text-white p-4 w-max rounded-lg hover:bg-[#B05082] hover:shadow-lg relative"
          onClick={() => {
            console.log(FB.getAuthResponse())
          }}
        >
          print fb auth status
        </button>
      )}
      {posts.map((post) => (
        <FacebookPost key={post.id} post={post} />
      ))}
    </section>
  )
}

export default Dashboard
