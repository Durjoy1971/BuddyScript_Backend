import CommentReaction from '#models/comment_reaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentReactionsController {
    async add({ request, response }: HttpContext) {
        const { currentUserId, commentId } = request.all()
    
        if (!currentUserId || !commentId) {
          console.log(request.all())
          return response.status(400).send('Missing required fields')
        }
    
        const reactions = await CommentReaction.query()
          .where('commentId', commentId)
          .where('userId', currentUserId)
          .first()
    
        if (reactions) {
          reactions.delete()
          return response.status(200).send({ success: false })
        } else {
          const newReaction = await CommentReaction.create({
            commentId,
            userId: currentUserId,
            reaction: 'love',
          })
          
          console.log(newReaction)
    
          return response.status(201).send({ success: true, reactionId: newReaction.id })
        }
      }
}