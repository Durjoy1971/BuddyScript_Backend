import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    userName: vine.string().trim(),
    picURL: vine.string().trim(),
    password: vine.string().trim(),
    email: vine.string().trim(),
  })
)
