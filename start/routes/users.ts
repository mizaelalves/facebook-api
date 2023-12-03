import Route from '@ioc:Adonis/Core/Route'

Route.post('users/register', 'Users/Register.store')
Route.get('users/register/:key', 'Users/Register.show')
Route.put('users/register/', 'Users/Register.update')


Route.get('users/info/', 'Main/UpdateInfoUsers.show').middleware('auth')
Route.put('users/info/', 'Main/UpdateInfoUsers.update').middleware('auth')

Route.put('users/avatar/', 'Users/Avatar.update').middleware('auth')
Route.delete('users/avatar/', 'Users/Avatar.destroy').middleware('auth')

Route.get('users/search', 'Search/ListUsers.index')
Route.get('users/list', 'Search/ShowAllUsers.index')