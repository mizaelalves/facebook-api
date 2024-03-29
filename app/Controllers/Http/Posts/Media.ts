import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { StoreValidator } from 'App/Validators/Post/Media'
import { Post } from 'App/Models'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class MediaController {
  public async store({ request, response, auth, params }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { file } = await request.validate(StoreValidator)
      const post = await Post.findOrFail(params.id)

      if (auth.user!.id !== post.userId) {
        return response.unauthorized()
      }

      post.useTransaction(trx)

      const media = await post.related('media').create({
        fileCategory: 'post',
        fileName: `${cuid()}.${file.extname}`
      })

      await file.move(Application.tmpPath('uploads'), {
        name: media.fileName
      })
      //response.status(200).send({ message: 'Operação bem-sucedida' });
      return media
    })
  }
}
