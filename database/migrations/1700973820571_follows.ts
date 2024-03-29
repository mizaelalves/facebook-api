import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('follower_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE') //quem esta seguindo
      table.integer('following_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE') //quem esta sendo seguido
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
