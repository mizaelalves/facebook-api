import Route from '@ioc:Adonis/Core/Route'
import './users'
import './auth'
import './forgotPassword'
import './uploads'
import './posts'
import './comment'
import './reactions'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})

Route.get('/forgot-password', async ({ view }) => {
  return view.render('emails/forgotPassword')
})
