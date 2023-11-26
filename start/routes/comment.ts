import Route from '@ioc:Adonis/Core/Route'

Route.post('posts/comment', 'Comments/Main.store').middleware('auth')
Route.put('posts/comment/:id', 'Comments/Main.update').middleware('auth')
Route.delete('posts/comment/:id', 'Comments/Main.destroy').middleware('auth')