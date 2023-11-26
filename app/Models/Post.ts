
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, HasOne, belongsTo, column, hasMany, hasOne, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import File from './File';
import Comment from './Comment';
import Reaction from './Reaction';

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public description:string

  @column({serializeAs: null})
  public userId:number

  @belongsTo(()=> User)
  public user:BelongsTo<typeof User>

  @hasMany(()=> Comment)
  public comment:HasMany<typeof Comment>

  @hasMany(() => Reaction, {serializeAs: null})
  public reactions: HasMany<typeof Reaction>

  @computed()
  public get commentCount(){
    return this.$extras.comments_count
  }

  @hasOne(()=> File,{
    foreignKey: 'ownerId',
    onQuery: (query) => query.where('fileCategory','post')
  })

  public media: HasOne<typeof File>

  @computed()
  public get reactionsCount(){
    return{
      like: this.$extras.likeCount || 0,
      love: this.$extras.loveCount || 0,
      haha: this.$extras.hahaCount || 0,
      sad: this.$extras.sadCount || 0,
      hungry: this.$extras.hungryCount || 0
    }
  }

  @computed()
  public get activeReation(){
    return this.reactions && this.reactions.length ? this.reactions[0].type : null
  }

}
