import Route from '@ioc:Adonis/Core/Route'

Route.post('users/register', 'Users/Register.store')
Route.get('users/register/:key', 'Users/Register.show')
Route.put('users/register/', 'Users/Register.update')


Route.get('users/info/', 'Main/UpdateInfoUsers.show').middleware('auth')
Route.put('users/info/', 'Main/UpdateInfoUsers.update').middleware('auth')

Route.put('users/avatar/', 'Users/Avatar.update').middleware('auth')
