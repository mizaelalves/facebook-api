
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import File from './File';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description:string

  @belongsTo(()=> User)
  public user:BelongsTo<typeof User>

  @hasOne(()=> File,{
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('FileCategory','post')
  })

  public media: HasOne<typeof File>
}
