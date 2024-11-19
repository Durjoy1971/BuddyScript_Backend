import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request, response }: HttpContext) {
    const { userId, content, imgURL } = request.all()
    console.log(userId, content, imgURL);
    if (!userId || !content || !imgURL) {
      return response.status(400).send('Missing required fields')
    }

    const newPost = await Post.create({
      userId,
      content,
      imageURL: imgURL,
    })

    return response.status(201).send({ success: true, newPost })
  }

  async update({ request, response }: HttpContext) {
    const { postId, content } = request.all()
    if (!postId || !content) {
      return response.status(400).send('Missing required fields')
    }

    const post = await Post.findOrFail(postId)
    post.content = content
    await post.save()

    return response.status(201).send({ success: true, post })
  }

  async delete({ request, response }: HttpContext) {
    const { postId } = request.all()
    if (!postId) {
      return response.status(400).send('Missing required fields')
    }
    console.log(postId)
    const post = await Post.findOrFail(postId)
    await post.delete()

    return response.status(201).send({ success: true })
  }

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
          .withCount('reactions')
          .preload('replies', (replyQuery) => {
            replyQuery
              .select('id', 'content', 'createdAt', 'userId')
              .withCount('commentedOn')
              .preload('user', (userQuery) => {
                userQuery.select('id', 'userName', 'picURL')
              })
          })
      })
      .withCount('reactions')
      .withCount('comments')

    return response.status(200).send(posts)
  }
}
