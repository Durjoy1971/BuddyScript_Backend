import vine from '@vinejs/vine'

export const createPostvalidator = vine.compile(
  vine.object({
    content: vine.string().trim().minLength(1).maxLength(255),
    imgURL: vine.string().trim().minLength(1).maxLength(255),
    currentUserId: vine.number(),
  })
)

export const deletePostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
  })
)

export const updatePostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    content: vine.string().trim().minLength(1).maxLength(255),
  })
)

export const reactionOnPostValidator = vine.compile(
  vine.object({
    postId: vine.number(),
    currentUserId: vine.number(),
  })
)