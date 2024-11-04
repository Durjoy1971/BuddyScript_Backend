import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'

export default class CommentReply extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column({ columnName: 'comment_id' })
  declare commentId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Comment, {
    localKey: 'id',
    foreignKey: 'commentId',
  })
  declare commentedOn: BelongsTo<typeof Comment>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}