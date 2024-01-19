import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Mail from '@ioc:Adonis/Addons/Mail';
import { faker } from '@faker-js/faker';


test.group('/user', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[store] - should able to send email after pre-registration', async ({ client, assert }) => {
    const mailer = Mail.fake()
    const email = faker.internet.email()

    await client.post('/users/register')
      .json({ email, redirectURL: 'https://facebook.com' })


    assert.isTrue(mailer.exists({ to: [{ address: email }] }))
    assert.isTrue(mailer.exists({ subject: 'Criação de conta' }))
    assert.isTrue(mailer.exists({
      from: {
        address: 'contato@facebook.com',
        name: 'Facebook'
      }
    }))


    Mail.restore()
  })

})