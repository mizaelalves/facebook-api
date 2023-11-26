import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    content: schema.string({trim: true}),
    postId: schema.number()
  })

  public cacheKey = this.ctx.routeKey
  public messages = {}
}
