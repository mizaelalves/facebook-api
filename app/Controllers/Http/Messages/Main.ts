import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation } from 'App/Models'
import { StoreValidator } from 'App/Validators/Message/Main'

export default class MessagesController {

  public async store({request, response, auth}: HttpContextContract) {
    const {content, receiverId} = await request.validate(StoreValidator)

    if (auth.user!.id === receiverId){
      return response.badRequest()
    }

    const existingConversations = await Conversation.query()
      .where({ userIdOne: auth.user!.id, userIdTwo: receiverId})
      .orWhere({ userIdOne: receiverId, userIdTwo: auth.user!.id})
      .first()

    if(existingConversations){
      const message = await existingConversations.related('messages').create({
        content,
        userId: auth.user!.id
      })
      return message
    }

    const conversation = await Conversation.create({
      userIdOne: auth.user!.id, 
      userIdTwo: receiverId
    })

    const message = await conversation.related('messages').create({
      content,
      userId: auth.user!.id
    })
    return message
    
  }
}
