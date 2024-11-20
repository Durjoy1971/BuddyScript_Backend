import Reaction from "#models/reaction";
import { PostQueries } from "./post_query.js";

export default class PostService {
    public async getFetchAllPostService() {
        const posts = await PostQueries.fetchAllPost();

        return {
            success: 'posts fetched successfully',
            posts,
            status: 200
        }
    }

    public async getCreatePostService(userId:number, content:string, imgURL:string) {
        const newPost = await PostQueries.createPost(userId, content, imgURL);

        return {
            success: 'post created successfully',
            newPost,
        }
    }    

    public async getDeletePostService(postId:number, userId:number) {
        const post = await PostQueries.postExistOrNot(postId);

        if (!post) {
            return {
                error: 'post not found',
                status: 404
            }
        }

        if(post.userId !== userId) {
            return {
                success: 'you are not authorized to delete this post',
                status: 200
            }
        }

        await PostQueries.deletePost(post);

        return {
            success: 'post deleted successfully',
            status: 201
        }
    }

    public async getUpdatePostService(postId:number, userId:number, content:string) {
        const post = await PostQueries.postExistOrNot(postId);
        if(!post) {
            return {
                error: 'post not found',
                status: 404
            }
        }

        if(post.userId !== userId) {
            return {
                success: 'you are not authorized to update this post',
                status: 200
            }
        }

        post.content = content;
        await post.save();

        return {
            success: 'post updated successfully',
            status: 201,
            postId
        }
    }

    public async getReactionOnPostService(postId:number, userId:number) {
        const post = await PostQueries.postExistOrNot(postId);
        if(!post) {
            return {
                error: 'post not found',
                status: 404
            }
        }

        const reaction = await Reaction.query()
            .where('postId', postId)
            .where('userId', userId)
            .first();

        if(reaction) {
            await reaction.delete();
            return {
                success: 'reaction deleted successfully',
                status: 200
            }
        } else {
            const newReaction = await Reaction.create({
                postId,
                userId,
                reaction: 'love'
            });

            return {
                success: 'reaction added successfully',
                status: 201,
                reactionId: newReaction.id,
                userId: newReaction.userId
            }
        }
    }
}