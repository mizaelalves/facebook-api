import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'
import { faker } from '@faker-js/faker';
test.group('/auth', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })



  test('[store] - should able to authenticate with valid credentials', async ({ client }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const response = await client.post('/auth').json({ email: user.email, password: 'secret' })

    response.assertStatus(200)
    response.assertTextIncludes('token')
    //response.assertBodyContains('token')

  })

  test('[store] - should failt to authenticate with invalid credentials', async ({ client }) => {
    (await client.post('/auth').json({ email: faker.internet.email(), password: 'secret' })).assertStatus(400)

  })

  test('[destroy] - should able to delete token after logout', async ({ client }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const response = await client.post('/auth').json({ email: user.email, password: 'secret' })


    const delete_token = await client.delete('/auth').bearerToken(`${response.body().token}`)

    delete_token.assertStatus(200)
    response.assertStatus(200)
    response.assertTextIncludes('token')
    const token = await Database.from('api_tokens').where({ user_id: user.id }).first()

    response.assert?.isNull(token)
  })
})
