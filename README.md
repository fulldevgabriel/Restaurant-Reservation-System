# Sistema de Autenticação com Cadastro, Login e Consulta de Usuários

Este projeto implementa um sistema básico de autenticação de usuários com rotas de **cadastro**, **login** e **consulta**. Ele utiliza **JWT (JSON Web Token)** para autenticação e **bcrypt** para hash de senhas. A aplicação foi construída com **Node.js** e **Express.js**, conectada a um banco de dados MySQL.

## Funcionalidades

- **Cadastro de Usuário**: Permite que um usuário crie uma conta, fornecendo um e-mail e senha. A senha é criptografada com **bcrypt** antes de ser armazenada no banco de dados.
- **Login de Usuário**: Permite que o usuário se autentique fornecendo seu e-mail e senha. A senha fornecida é comparada com o hash armazenado no banco de dados.
- **Consulta de Usuários**: Permite que um usuário autenticado consulte os dados de todos os usuários cadastrados.

## Tecnologias Utilizadas

- **Node.js** e **Express.js**: Para a construção do servidor e das rotas da API.
- **JWT (JSON Web Token)**: Para gerar tokens de autenticação para sessões de usuário.
- **bcrypt**: Para hash de senhas e verificação de senhas no processo de login.
- **MySQL**: Para o armazenamento de dados de usuários.

## Como Utilizar

### 1. Clonar o Repositório

Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### 2. Instalar as Dependências
Navegue até a pasta do projeto e instale as dependências utilizando o npm (Node Package Manager):

```bash
npm install
```

### 3. Configurar o Banco de Dados
Crie um banco de dados MySQL com o nome desejado. Em seguida, configure o arquivo .env na raiz do projeto com as informações do seu banco de dados. O arquivo .env deve conter:

```bash
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```
### 4. Executar a Aplicação
Inicie o servidor localmente executando o seguinte comando:

```bash
npm start
```
### 5. Testar a API
A API pode ser testada com ferramentas como Postman ou Insomnia. A seguir, as rotas disponíveis:

- **POST /register:** Rota para cadastro de um novo usuário.

    - Parâmetros no corpo da requisição: email, senha.
    - Retorno: Status de sucesso ou erro. 
- **POST /login:** Rota para login de um usuário existente.

    - Parâmetros no corpo da requisição: email, senha.
    - Retorno: JWT de autenticação. 
- **GET /users:** Rota para consulta de todos os usuários (apenas para usuários autenticados).

    - Cabeçalho: Authorization: Bearer <token>
    - Retorno: Lista de usuários cadastrados.
  
Exemplo de requisição de cadastro (POST /register):

```bash
{
  "name": "usuario",
  "email": "usuario@exemplo.com",
  "pass": "senha",
  "confirmPass": "senha"
}
```
Exemplo de requisição de login (POST /login):
```bash
{
  "userEmail": "usuario@exemplo.com",
  "userPass": "senha"
}

