import { DateTime } from 'luxon'
import { BaseModel, column,belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Message from './Message'

export default class Conversation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userIdOne:number

  @column()
  public userIdTwo:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userIdOne' })
  public userOne: BelongsTo<typeof User>;

  @belongsTo(() => User, { foreignKey: 'userIdTwo' })
  public userTwo: BelongsTo<typeof User>;


  @hasMany(()=> Message)
  public messages:HasMany<typeof Message>

}
