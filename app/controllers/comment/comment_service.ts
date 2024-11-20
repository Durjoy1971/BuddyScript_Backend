import { CommentQueries } from "./comment_query.js";

export default class CommentService {
    public async getAddReactionService(userId:number, commentId:number) {
        const reaction = await CommentQueries.previouslyReactedOrNot(userId, commentId)

        const comment = await CommentQueries.commentExistOrNot(commentId);

        if (!comment) {
            return {
                error: 'comment not found',
                status: 404
            }
        }

        if(reaction) {
            const deleteReaction = await CommentQueries.deleteReaction(reaction)
            return {
                success: 'reaction take backed',
                deleteReaction,
                userId,
                status: 200
            }           
        }
        else {
            const newReaction = await CommentQueries.createReaction(commentId, userId)
            return {
                success: "reacted successfully",
                reactionId: newReaction.id,
                userId,
                status: 201
            }
        }
    }

    public async getAddCommentService(userId:number, postId:number, content:string) {
        const post = await CommentQueries.postExistOrNot(postId);
        if(!post) {
            return {
                error: 'post not found',
                status: 404
            }
        }

        const newComment = await CommentQueries.createComment(userId, postId, content)

        return {
            success: 'comment added successfully',
            newComment:newComment.serialize(),
            status: 201
        }
    }

    public async getAddCommentReplyService(commentId:number, userId:number, content:string) {

        const comment = await CommentQueries.commentExistOrNot(commentId);

        if (!comment) {
            return {
                error: 'comment not found',
                status: 404
            }
        }
        

        const newCommentReply = await CommentQueries.createCommentReply(commentId, userId, content)

        return {
            success: 'comment reply added successfully',
            newCommentReply:newCommentReply.serialize(),
            status: 201
        }
    }
}