# BOILERPLATE NODEJS

---

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

  <a href="https://andrejr.dev">
    <img alt="Feito por André Junior" src="https://img.shields.io/badge/feito%20por-André Junior-blue">
  </a>
</p>

## Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nodemailer](https://nodemailer.com/about/)
- [JWT](https://typeorm.io/#/)
- [TypeOrm](https://typeorm.io/#/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io)

## Setup
Para baixar e configurar o projeto siga as instruções abaixo:

- Primeiro clone o projeto
  ```bash
    git clone  https://github.com/andrejr971/boilerplate-nodejs
  ```
- Navegue até a pasta
  ```bash
    cd boilerplate-nodejs
  ```
- Instale as dependências:
  ```bash
    yarn
  ```
- Depois **Renomei o arquivo ormconfig.example.json para ormconfig.json**,
é neste aquivo que fica as configurações de acesso ao banco, nele você vai colar as suas credenciais de acesso.

- Para iniciar o servidor
  ```bash
    yarn dev
  ```
### Rodar pelo Docker

Edite o arquivo Dockerfile e docker-compose.yml

```bash
  docker build -t <name-container> .

  docker run -p 3333:3333 <name-container>

  # Usando docker-compose
  docker-componse up

  # Executar em segundo plano
  docker-componse up -d

  # logs
  docker logs <name-container> -f

  # Recriando Container
  docker-compose up --force-recreate
```

### Documentação da api
Para a documentar a api, estou usando a lib [Swagger](https://swagger.io),
disponível na rota: http://localhost:3333/docs/.
A configuração da documentação está no arquivo swagger.json