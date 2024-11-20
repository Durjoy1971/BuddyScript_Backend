import vine from "@vinejs/vine";


/**
 * Validates reactions on a reply
 */

export const addReactionValidator = vine.compile(
    vine.object({
        currentUserId: vine.number(),
        commentId: vine.number(),
    })
)

export const addCommentValidator = vine.compile(
    vine.object({
        postId: vine.number(),
        content: vine.string().trim().minLength(1).maxLength(255),
        currentUserId: vine.number(),
    })
)

export const createCommentReplyValidator = vine.compile(
    vine.object({
        commentId: vine.number(),
        userId: vine.number(),
        content: vine.string().trim().minLength(1).maxLength(255),
    })
)