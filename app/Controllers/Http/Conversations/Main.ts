import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Conversation} from 'App/Models'

export default class MessagesController {

  public async show({ response, auth, params }: HttpContextContract) {
    try {
      const conversation = await Conversation.findOrFail(params.id)
      if(![conversation.userIdOne, conversation.userIdTwo].includes(auth.user!.id)){
        return response.unauthorized()
      }
      await conversation.load('messages')

      return conversation
    } catch (error) {
      return ({ 'message': error })
    }
  }
  public async index({ auth }: HttpContextContract) {
    


    const userId = auth.user!.id;

    // Carrega todas as conversas do usuário
    const conversations = await Conversation.query()
    .where('userIdOne', userId)
    .orWhere('userIdTwo', userId)
    .orderBy('created_at', 'desc')
    .preload('messages', (messageQuery) => {
      messageQuery
        .select(['id', 'content', 'user_id', 'conversation_id', 'created_at'])
        .orderBy('created_at', 'desc')
        .limit(1); // Limite para obter apenas a última mensagem
      // Adicione mais pré-carregamentos ou condições de consulta, se necessário
    })
    
    .preload('userOne', (userQuery) => {
    
      userQuery.select(['id', 'username']).preload('avatar'); // Substitua pelos atributos desejados do usuário
    })
    .preload('userTwo', (userQuery) => {
      userQuery.select(['id', 'username']).preload('avatar'); // Substitua pelos atributos desejados do usuário
    });

    return conversations;
    

  }
}
