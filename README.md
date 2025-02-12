- [] Criação de conta
- [] Login
  - Validar e-mail e senha
  - Gerar tokens
- [] Proteção das rotas
- [] Obtenção de novos tokens por meio do refresh token

# Setup of app

install

1 - Step to install package json
init -y

2 - Step to install typescript
npm i -D typescript@5.7.2 ts-node@10.9.2 @types/node@22.10.1

3 - Start setup of typescript
npx tsc --init
vai criar o arquivo tsconfig

4 - to Install Express
npm i express@4.21.1

5 - types of express
npm i -D @types/express

## To run code

npx ts-node src/index.ts

- crie um script para o server ficar rodando.
  "scripts": {
  "start:dev": "ts-node src/index.ts"
  },

  ## code pwd

  - install bcryptjs
    npm i bcryptjs
  - types of bcrypt.js
    npm i -D @types/bcryptjs

    ## DB

    - ORM Mongoose
      npm i mongoose@8.8.3

  userName: cajui54
  pwd: ftebepbaT9yS6hLw
