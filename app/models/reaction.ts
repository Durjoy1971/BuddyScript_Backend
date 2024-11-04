import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Post from './post.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
export default class Reaction extends BaseModel {
  
  @column({ isPrimary: true })
  declare id: number
  @column({ columnName: 'post_id' })
  declare postId: number
  @column()
  declare reaction: 'love'
  @column()
  declare userId: number
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
  @belongsTo(() => Post, {
    localKey: 'id',
    foreignKey: 'postId',
  })
  declare post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}