import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({}: HttpContext) {}

  async update({}: HttpContext) {}

  async fetchAllPost({ response }: HttpContext) {
    const posts = await Post.query()
      .select('id', 'content', 'image_url', 'createdAt', 'userId')
      .orderBy('id', 'desc')
      .preload('user', (userQuery) => {
        userQuery.select('id', 'userName', 'picURL')
      })
      .preload('reactions', (reactionQuery) => {
        reactionQuery.select('id', 'reaction', 'userId')
      })
      .preload('comments', (commentQuery) => {
        commentQuery
          .select('id', 'content', 'createdAt', 'userId')
          .preload('commentedBy', (userQuery) => {
            userQuery.select('id', 'userName', 'picURL')
          })
          .preload('reactions', (reactionQuery) => {
            reactionQuery.select('id', 'reaction', 'userId')
          })
      })
      .withCount('reactions')
      .withCount('comments')

    return response.status(200).send(posts)
  }
}
