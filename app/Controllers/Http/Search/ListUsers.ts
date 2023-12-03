import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


import Database from '@ioc:Adonis/Lucid/Database'

export default class ListUsersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const keyword = request.input('keyword', '');
      const query = Database.query()
        .select('id', 'name', 'username')
        .from('users')
        .where('name', 'like', `%${keyword}%`)
        .orWhere('username', 'like', `%${keyword}%`);

      const userList = await query;
      return userList;
    } catch (error) {
      let mensagem = ('Usuário não encontrado')
      return response.badRequest({ message: mensagem })
    }

    /*
    const listUsers = await Database.rawQuery(`SELECT id,name, username FROM users WHERE name = '${params.keyword}' OR username = '${params.keyword}'`)
    // Filtrar e mapear apenas os campos "name" e "username" do JSON
    const filteredListUser = listUsers.flatMap((users: { id: any; name: any; username: any; }[]) => users.map(({ id,name, username }) => ({ id,name, username })));

    return filteredListUser
    */
  }

}
