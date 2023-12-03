import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { User } from 'App/Models';
import Database from '@ioc:Adonis/Lucid/Database';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {
  public async show({ request, response, auth }: HttpContextContract) {
    try {
      const { username } = request.qs()
      const user = await User.query().where({ username }).preload('avatar').withCount('posts').withCount('followers').withCount('following').firstOrFail()

      if (user.id !== auth.user!.id) {
        const isFollowing = await Database.query().from('follows').where('follower_id', auth.user!.id).first()
        
        user.$extras.isFollowing = isFollowing ? true : false
      }

      return user.serialize({
        fields: {
          omit: ['email', 'createdAt', 'updatedAt', 'rememberMeToken']
        }
      })
    } catch (error) {
      return response.badRequest({ message: error })
    }

  }
}
