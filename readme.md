App.js
  essa classe é um wrapper do express, contem os middlewares e as rotas da aplicação.
  ela exporta diretamente o server.


nodemom.json
  sempre que executar um arquivo .js 
  -r é para rodar esse arquivo antes de iniciar a aplicação 
  ele vai no nodemodules e executa esse cara sucrase/register 

debug
  no--inspect 



  ---------

  Configuração do banco de dados.

  dependencias:
    yarn add sequelize
    yarn add sequelize-cli
    yarn add pg pg-hstore //para postgres, para outros bancos `https://sequelize.org/master/manual/dialects.html`

  O arquivo `config/database.js` é onde definimos as configuraçãos da base que vamos utilizar pelo sequalize.

   - o campo define:undersocred é para criar tabelas com _ no lugar de camelcase ex: uma model UserGroup criaria uma tabela user_groups e não UserGroups.

   -- criando migrations:
    Usando a cli do sequelize:
      yarn sequelize migration:create --name=create-users
    para rodar a migration:
      yarn sequelize db:migrate
    para reverter a ultima migration
      yarn db:migrate:undo
    para reverter todas as migrations
      yarn db:migrate:undo:all


  -- criando uma model
    extender a classe Model do sequelize e iniciar ela (super.init({},{})),
    passando quais colunas vão ser preenchidas e a conecção no segundo parametro

    - nem todos os campos passados no primeiro parametro precisam ser colunas na tabela, esses campos  podem ser do tipo Sequalize.VIRTUAL, esse tipo de campo podem ser usados para manipular o que vai ser gravado na tabela, usando os hooks, por exemplo encriptar o password do usuario antes de salvar no banco


  -- carregando os models na aplicação.
    no arquivo database/index.js
    no init criamos a coneção para cada uma das models,
    - para carregar o banco adicionar o import no app.js `import './database';`

  
- Controllers // todo controller basicamente é uma classe com alguns middlewares

- autenticação JWT
  dividido em 3 partes
    headers: tipo de token / algoritmo
    payload: informações do usuario não sensiveis
    assinatura: garante que o token não foi alterado, valida os outros 2 campos

    yarn add jsonwebtoken

  session controler:
  - verifica se usuario existe e se a senha esta correta
  - cria e retorna a sessão do usuario como jwtToken

  bloqueando rotas para usuarios não autenticados:
  - middleware de autenticação 
    para verificar o token usamos a função jwt.verify que precisa de um calback, para não precisar de um calback podemos usar o  promisify que transforma uma função de calback em async/await, essa função tenta decodificar o token usando o mesmo secret, retornando o payload

  - validação dos dados de entrada:
  lib yup para validar o schema