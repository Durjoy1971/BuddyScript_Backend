import type { HttpContext } from '@adonisjs/core/http'

import Comment from "#models/comment"

export default class CommentReactionController {
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
            .preload('reactions', (reactionQuery) => {
                reactionQuery.select('id', 'reaction', 'userId')
            })
        if (!comments) {
            return response.status(200).send('No comments found')
        }
        return response.status(201).send(comments)
    }

    public async add({ request, response }: HttpContext) {
        const { currentUserId, postId, content } = request.all()

        if (!currentUserId || !postId || !content) {
            console.log(request.all())
            return response.status(400).send('Missing required fields')
        }

        const newComment = await Comment.create({
            content,
            postId,
            userId: currentUserId,            
        })

        return response.status(201).send({ success: true, newComment})
    }
}