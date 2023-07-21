import { StoreValidator, UpdateValidator } from 'App/Validators/User/ForgotPassword'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User, UserKey } from 'App/Models'
import { v4 as uuidv4 } from 'uuid'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    
    await Database.transaction(async (trx) => {
      const { email, redirectURL } = await request.validate(StoreValidator)

      await trx 
        .from('users').where({'email':email})
      const user = await  User.findByOrFail('email', email)
      user.useTransaction(trx)

      const key = uuidv4() + user.id
      user.related('keys').create({ key })

      const link = `${redirectURL.replace(/\/$/, '')}/${key}`

      await Mail.send((message) => {
        message.to(email)
        message.from('contato@facebook.com', 'Facebook')
        message.subject('Recuperação de senha')
        message.htmlView('emails/forgotPassword', { link, email })
      })
    })
  }
  public async show({ params }: HttpContextContract) {
    const userKey = await UserKey.findByOrFail('key', params.key)
    const user = await userKey.related('user').query().firstOrFail()

    return user
  }
  public async update({ request, response }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)
    const userKey = await UserKey.findByOrFail('key', key)
    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ password})

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'OK' })
  }
}
