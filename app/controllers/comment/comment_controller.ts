import type { HttpContext } from '@adonisjs/core/http'
import { addCommentValidator, addReactionValidator, createCommentReplyValidator } from './comment_validator.js'
import CommentService from './comment_service.js'

//* new CommentController
export default class CommentController {
  private commentService: CommentService

  constructor() {
    this.commentService = new CommentService()
  }

  public async addReaction({ auth, request, response }: HttpContext) {
    try {
      const { commentId } = request.all()

      if (!commentId) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateData = await addReactionValidator.validate({ currentUserId, commentId })

      const reactions = await this.commentService.getAddReactionService(
        validateData.currentUserId,
        validateData.commentId
      )
      
      if (reactions.status === 404) {
        return response.status(404).send(reactions.error)
      } else if (reactions.status === 200) {
        const { status, ...reactionData } = reactions
        return response.status(200).send(reactionData)
      } else {
        const { status, ...reactionData } = reactions
        return response.status(201).send(reactionData)
      }
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding reaction')
    }
  }

  public async addComment({ auth, request, response }: HttpContext) {
    try {
      const { postId, content } = request.all()
      if (!postId || !content) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateDate = await addCommentValidator.validate({ currentUserId, postId, content })

      const newComment = await this.commentService.getAddCommentService(
        validateDate.currentUserId,
        validateDate.postId,
        validateDate.content
      )

      return response.status(201).send({ ...newComment })
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding comment')
    }
  }

  public async addCommentReply({ auth, request, response }: HttpContext) {
    try {
      const { commentId, content } = request.all()
      if (!commentId || !content) {
        return response.status(400).send('Missing required fields')
      }

      const currentUserId = auth.use('web').user?.serialize().id

      const validateData = await createCommentReplyValidator.validate({
        commentId,
        userId: currentUserId,
        content
      })

      const newCommentReply = await this.commentService.getAddCommentReplyService(
        validateData.commentId,
        validateData.userId,
        validateData.content
      )

      return response.status(201).send({ ...newCommentReply })
    } catch (error) {
      return response
        .status(500)
        .send(error.messages || 'An unexpected error occurred while adding comment reply')
    }
  }
}
