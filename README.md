
# 📝 To Do List

Projeto de lista de tarefas com autenticação via Google e persistência de dados usando MongoDB. Desenvolvido com HTML, TailwindCSS, TypeScript e Node.js (Express) em uma única aplicação fullstack.

---

## 🛠️ Tecnologias utilizadas

### Frontend:
- HTML
- TailwindCSS
- TypeScript

### Backend:
- Node.js
- Express
- MongoDB (via MongoDB Compass/local)
- Autenticação com Google (OAuth 2.0)
- JWT para controle de sessão

---

## ⚙️ Como rodar localmente

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) instalado e rodando localmente
- Conta no Google e app criado no [Google Cloud Console](https://console.cloud.google.com/) com OAuth 2.0

---

### 2. Clonar o repositório

```bash
https://github.com/SoaresPedronhoDev/To-Do-List.git
cd To-Do-List
```

---

### 3. 🔐 Exemplo de `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/todolist
JWT_SECRET=sua_chave_secreta_aqui
SESSION_SECRET=chave_secreta
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CALLBACK_URL=http://localhost:5001/auth/google/callback
```

> ⚠️ **Importante:** O arquivo `.env` **não é incluído no repositório**. Ele deve ser criado manualmente por quem for rodar o projeto.

---

### 4. Instalar as dependências

```bash
npm install
```

---

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse: `http://localhost:5001`

---

## 🙋‍♂️ Autor

Pedro Henrique Domingues  
[LinkedIn]([https://www.linkedin.com/in/seulinkedin](https://www.linkedin.com/in/pedro-henrique-domingues-109178326/))   

---

## 📄 Licença

Este projeto está sob a licença MIT.
