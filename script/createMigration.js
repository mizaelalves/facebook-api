'use strict';

const { Ignitor } = require('@adonisjs/core/build/standalone');

async function runMigrations() {
  try {
    // Inicialize o Ignitor
    const ignitor = new Ignitor();

    // Carregue as configurações do aplicativo
    await ignitor
      .appRoot(__dirname)
      .fireHttpServer()
      .catch(console.error);

    // Execute todas as migrações
    await ignitor.wire();

    // Execute as migrações pendentes
    await ignitor.runCommand('migration:run');

    console.log('Migrações executadas com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1);
  }
}

// Execute a função de migração
runMigrations();
