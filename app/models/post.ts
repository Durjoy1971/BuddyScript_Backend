import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Comment from './comment.js'
import Reaction from './reaction.js'

export default class Post extends BaseModel {
  public serializeExtras = true

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare content: string

  @column({columnName: 'image_url'})
  declare imageURL: string

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'postId',
  })
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Reaction, {
    localKey: 'id',
    foreignKey: 'postId',
  })
  declare reactions: HasMany<typeof Reaction>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}