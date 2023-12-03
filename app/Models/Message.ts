import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, afterCreate, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Conversation from './Conversation'
import Ws from 'App/Services/Ws'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public content: string

  @column()
  public conversationId: number

  @belongsTo(()=> User)
  public user:BelongsTo<typeof User>
  
  @hasOne(()=> Conversation)
  public conversation:HasOne<typeof Conversation>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @afterCreate()
  public static dispatchMessage(message: Message){
    Ws.io.to(`room-${message.conversationId}`).emit('newMessage', {
      content: message.content,
      userId: message.userId
    })
  }

}
