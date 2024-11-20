import vine from '@vinejs/vine'

export const createRegisterUserValidator = vine.compile(
  vine.object({
    userName: vine
      .string()
      .trim()
      .toUpperCase()
      .minLength(1)
      .maxLength(30)
      .unique(async (db, value) => {
        const user = await db.from('users').where('user_name', value).first()
        if (user) {
          throw new Error(`User name must be unique`)
        }
        return !user
      }),
    password: vine.string().trim().minLength(6).maxLength(255),
    email: vine
      .string()
      .trim()
      .toLowerCase()
      .minLength(7)
      .maxLength(255)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        if (user) {
          throw new Error(`Email must be unique`)
        }
        return !user
      }),
    picURL: vine.string().trim().minLength(6).maxLength(255),
  })
)

export const validateEmailUserNameValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .toLowerCase()
      .minLength(7)
      .maxLength(255)
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        if (user) {
          throw new Error(`Email must be unique`)
        }
        return !user
      }),
    userName: vine
      .string()
      .trim()
      .toUpperCase()
      .minLength(1)
      .maxLength(30)
      .unique(async (db, value) => {
        const user = await db.from('users').where('user_name', value).first()
        if (user) {
          throw new Error(`User name must be unique`)
        }
        return !user
      }),
  })
)
