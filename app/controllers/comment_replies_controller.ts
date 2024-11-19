import CommentReply from '#models/comment_reply'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentRepliesController {
  async add({ request, response }: HttpContext) {
    console.log('Hi')
    const { commentId, userId, content } = request.all()
    if (!commentId || !userId || !content) {
      return response.status(400).send('Missing required fields')
    }

    const newCommentReply = await CommentReply.create({
      commentId,
      userId,
      content,
    })

    return response.status(201).send({ success: true, newCommentReply })
  }
}
