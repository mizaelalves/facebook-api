import Route from '@ioc:Adonis/Core/Route'

Route.post('users/forgot-password', 'Users/ForgotPassword.store')
Route.get('users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('users/forgot-password/', 'Users/ForgotPassword.update')
