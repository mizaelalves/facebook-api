import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/Models';

export default class ListUsersController {
  public async index({}: HttpContextContract) {
    const usuarios = await User.query()
    .select('id', 'name', 'username', 'email')
    .preload('avatar') // Inclua o relacionamento com o avatar
    

    return usuarios
    /*
    const listUsers = await Database.rawQuery(`SELECT id,name, username FROM users WHERE name = '${params.keyword}' OR username = '${params.keyword}'`)
    // Filtrar e mapear apenas os campos "name" e "username" do JSON
    const filteredListUser = listUsers.flatMap((users: { id: any; name: any; username: any; }[]) => users.map(({ id,name, username }) => ({ id,name, username })));

    return filteredListUser
    */
  }

}
