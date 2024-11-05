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
}
