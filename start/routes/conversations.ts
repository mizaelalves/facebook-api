import Route from '@ioc:Adonis/Core/Route'

Route.get('/conversations/all', 'Conversations/Main.index').middleware('auth')
Route.get('/conversations/:id', 'Conversations/Main.show').middleware('auth')