import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { StoreValidator, UpdateValidator } from 'App/Validators/Comment'

import { Post, Comment } from 'App/Models'


export default class PostsController {

  public async store({ request, auth }: HttpContextContract) {
    const {content, postId} = await request.validate(StoreValidator)
    
    const post = await Post.findOrFail(postId)
    console.log(auth.user)
    const comment = await post.related('comment').create({ content, userId: auth.user!.id})
    return comment
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const comment = await Comment.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }

    await comment.merge(data).save()
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    const comment = await Post.findOrFail(params.id)

    if (auth.user!.id !== comment.userId) {
      return response.unauthorized()
    }


    await comment.delete()
  }

}
