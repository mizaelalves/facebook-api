import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import User from './User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({serializeAs: null})
  public userId:number

  @column({serializeAs: null})
  public postId:number
  

  @belongsTo(() => Post)
  public post:BelongsTo<typeof Post>

  @belongsTo(()=> User)
  public user:BelongsTo<typeof User>
}
