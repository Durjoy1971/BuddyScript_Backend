import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import CommentReaction from './comment_reaction.js'
import CommentReply from './comment_reply.js'

export default class Comment extends BaseModel {
  public serializeExtras = true
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare content: string
  @column({ columnName: 'user_id' })
  declare userId: number
  @column({ columnName: 'post_id' })
  declare postId: number
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare commentedBy: BelongsTo<typeof User>
  @belongsTo(() => Post, {
    localKey: 'id',
    foreignKey: 'postId',
  })
  declare posted: BelongsTo<typeof Post>

  @hasMany(() => CommentReaction, {
    localKey: 'id',
    foreignKey: 'commentId',
  })
  declare reactions: HasMany<typeof CommentReaction>

  @hasMany(() => CommentReply, {
    localKey: 'id',
    foreignKey: 'commentId',
  })
  declare replies: HasMany<typeof CommentReply>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}