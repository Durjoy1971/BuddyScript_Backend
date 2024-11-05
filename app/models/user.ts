import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Post from './post.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reaction from './reaction.js'
import CommentReaction from './comment_reaction.js'
import CommentReply from './comment_reply.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

export default class User extends BaseModel {
  public serializeExtras = true
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_name' })
  declare userName: string

  @column({ columnName: 'pic_url' })
  declare picURL: string

  @column({ serializeAs: null })
  declare password: string

  @column({ columnName: 'email' })
  declare email: string

  @hasMany(() => Reaction, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare reactions: HasMany<typeof Reaction>

  @hasMany(() => Post, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare posts: HasMany<typeof Post>

  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare comments: HasMany<typeof Comment>

  @hasMany(() => CommentReaction, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare commentReactions: HasMany<typeof CommentReaction>

  @hasMany(() => CommentReply, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare commentReplies: HasMany<typeof CommentReply>
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
