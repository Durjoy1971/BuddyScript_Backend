import Comment from "#models/comment";
import CommentReaction from "#models/comment_reaction";
import CommentReply from "#models/comment_reply";
import Post from "#models/post";


export class CommentQueries {
    
    public static async previouslyReactedOrNot(userId:number, commentId:number) {
        return await CommentReaction.query()
        .where('commentId', commentId)
        .where('userId', userId)
        .first()
    }

    public static async deleteReaction(reactions:CommentReaction) {
        return await reactions.delete()
    }

    public static async createReaction(commentId:number, userId:number) {
        return await CommentReaction.create({
            commentId,
            userId,
            reaction: 'love',
        })
    }    

    public static async createComment(userId:number, postId:number, content:string) {
        return await Comment.create({
            postId,
            userId,
            content,
        })
    }

    public static async createCommentReply(commentId:number, userId:number, content:string) {
        return await CommentReply.create({
            commentId,
            userId,
            content,
        })
    }

    public static async commentExistOrNot(commentId:number) {
        console.log(commentId);
        return await Comment.query()
        .where('id', commentId)
        .first()
    }

    public static async postExistOrNot(postId:number) {
        return await Post.query()
        .where('id', postId)
        .first()
    }

    
}