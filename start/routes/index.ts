import Route from '@ioc:Adonis/Core/Route'
import './users'
import './auth'
import './forgotPassword'
import './uploads'
import './posts'
import './comment'
import './reactions'
import './follows'
import './profiles'
import './messages'
import './conversations'

Route.on('/teste').render('teste')
Route.on('/chat').render('chat')

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/user-register', async ({ view }) => {
  return view.render('emails/register')
})

Route.get('/forgot-password', async ({ view }) => {
  return view.render('emails/forgotPassword')
})
