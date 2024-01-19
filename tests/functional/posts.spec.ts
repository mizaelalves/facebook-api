import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { PostFactory, UserFactory } from "Database/factories";
import { generateToken } from '../utils';
import { Post } from 'App/Models';
import { faker } from '@faker-js/faker';

test.group('/posts', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })


  test('[index] - should able to list posts correctly', async ({ client, assert }) => {
    //const user = await UserFactory.merge({ password: 'secret' }).with('posts', 5).create()
    const user = await UserFactory.merge({ password: 'secret' }).with('posts', 3, (post) => post.with('media')).create()

    const { token } = await generateToken()

    const response = await client.get(`/posts?username=${user.username}`).bearerToken(token)

    response.assertStatus(200)

    // Verifica se o tamanho da lista de posts é igual ao número de posts criados para o usuário
    assert.lengthOf(response.body(), user.posts.length);

    response.body().forEach((post: Post) => {
      assert.exists(post.id)
      assert.exists(post.description)
      assert.exists(post.user.name)
      assert.exists(post.user.username)
      assert.exists(post.comment)
      //assert.exists(post.commentCount)
      assert.exists(post.reactionsCount.like)
      assert.exists(post.reactionsCount.love)
      assert.exists(post.reactionsCount.haha)
      assert.exists(post.reactionsCount.sad)
      assert.exists(post.reactionsCount.hungry)
    });

  })

  test('[store] - should able to authenticate with valid credentials', async ({ client }) => {
    const { token } = await generateToken()

    const response = await client
      .post('/posts')
      .bearerToken(token)
      .json({ description: faker.lorem.words() })
    response.assertStatus(200)
  })

  test('[store] - should able to create a post with valid credentials', async ({ client }) => {


    const response = await client
      .post('/posts')
      .json({ description: faker.lorem.words() })
    response.assertStatus(401)
  })

  test('[update] - should able to update with valid credentials', async ({ client, assert }) => {
    const { token, user } = await generateToken()
    const post = await PostFactory.merge({ userId: user.id }).create()
    const newDescription = faker.lorem.words()

    const response = await client
      .put(`/posts/${post.id} `)
      .bearerToken(token)
      .json({ description: newDescription })

    response.assertStatus(200)
    assert.equal(response.body().description, newDescription)
  })

  test('[update] - should fail to update when is not authenticate', async ({ client }) => {

    const post = await PostFactory.create()
    const newDescription = faker.lorem.words()

    const response = await client
      .put(`/posts/${post.id} `)

      .json({ description: newDescription })
    response.assertStatus(401)

  })

  test('[update] - should fail to update a post from another user', async ({ client }) => {
    const { token } = await generateToken()
    const post = await PostFactory.create()
    const newDescription = faker.lorem.words()

    const response = await client
      .put(`/posts/${post.id} `)
      .bearerToken(token)
      .json({ description: newDescription })

    response.assertStatus(401)
  })

  test('[destroy] - should able to destroy a post when authenticated', async ({ client }) => {
    const { token, user } = await generateToken()
    const post = await PostFactory.merge({ userId: user.id }).create()

    const response = await client
      .delete(`/posts/${post.id} `)
      .bearerToken(token)

    response.assertStatus(200)

  })

  test('[destroy] - should fail to destroy a post when is not authenticated', async ({ client }) => {
    const post = await PostFactory.create()

    const response = await client
      .delete(`/posts/${post.id} `)

    response.assertStatus(401)
  })

  test('[destroy] - should failt to destroy a post from another user', async ({ client }) => {
    const { token } = await generateToken()
    const post = await PostFactory.create()

    const response = await client
      .delete(`/posts/${post.id} `)
      .bearerToken(token)
    response.assertStatus(401)
  })


})
test.group('/posts/:id/media', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('[store] - should able to attach an image to a post', async ({ client, assert }) => {

    const { user, token } = await generateToken()

    const post = await PostFactory.merge({ userId: user.id }).create()

    const response = await client.post(`/posts/${post.id}/media`)
      .bearerToken(token)
      .file('file', 'tests\\assets\\image.png')
    response.assertStatus(200)

    const postMedia = await Database.from('files').where({ file_category: 'post', owner_id: post.id }).first()

    assert.exists(postMedia.id)

  })

})