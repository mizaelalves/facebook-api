import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/Main'

export default class UpdateInfoUsersController {
  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const user = auth.user!

    user.merge(data)

    await user.save()


    return user
  }
}
