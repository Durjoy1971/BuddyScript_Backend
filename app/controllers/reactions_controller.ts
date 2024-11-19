import Reaction from '#models/reaction'
import type { HttpContext } from '@adonisjs/core/http'

export default class ReactionsController {
  async fetch({ request, response }: HttpContext) {
    const { postId } = request.all()
    if (!postId) {
      return response.status(400).send('Missing required fields')
    }
    const reactions = await Reaction.query()
      .select('id', 'reaction', 'userId')
      .where('postId', postId)
      .preload('user', (userQuery) => {
        userQuery.select('id', 'userName', 'picURL')
      })
    if (!reactions) {
      return response.status(200).send('No reactions found')
    }
    return response.status(201).send(reactions)
  }

  async add({ request, response }: HttpContext) {
    const { currentUserId, postId } = request.all()

    if (!currentUserId || !postId) {
      console.log(request.all())
      return response.status(400).send('Missing required fields')
    }

    const reactions = await Reaction.query()
      .where('postId', postId)
      .where('userId', currentUserId)
      .first()

    if (reactions) {
      reactions.delete()
      return response.status(200).send({ success: false })
    } else {
      const newReaction = await Reaction.create({
        postId,
        userId: currentUserId,
        reaction: 'love',
      })
      
      console.log(newReaction)

      return response.status(201).send({ success: true, reactionId: newReaction.id })
    }
  }
}
