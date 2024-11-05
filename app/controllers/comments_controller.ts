import type { HttpContext } from '@adonisjs/core/http'

import Comment from "#models/comment"

export default class CommentsController {
    public async fetch({ request, response }: HttpContext) {
        const { postId } = request.all()
        if (!postId) {
            return response.status(400).send('Missing required fields')
        }
        const comments = await Comment.query()
            .select('id', 'content', 'userId', 'postId')
            .where('postId', postId)
            .preload('commentedBy', (userQuery) => {
                userQuery.select('id', 'userName', 'picURL')
            })
        if (!comments) {
            return response.status(200).send('No comments found')
        }
        return response.status(201).send(comments)
    }
}