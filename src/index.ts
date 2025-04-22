// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()
import passport from './config/passport';
import authRoutes from './routes/authRoute';
import todoGet from './routes/todoRoute';
import userRoutes from './routes/userRoutes'; 
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo'; 

dotenv.config();

const app = express();
const PORT = 5001; // porta do servidor

app.use(cookieParser());

// middleware para parsing de URL-encoded
// middleware para parsing de JSON
app.use(express.json());

//configuracoes do express-session

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ // armazem de sessoes no mongo db
      mongoUrl: 'mongodb://localhost:27017/todo-list',
      ttl: 14 * 24 * 60 * 60 // 14 dias
    }),
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 // 1 dia
    }
  })
);

app.use(passport.initialize())
app.use(passport.session())

// servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Rotas
app.use('/auth', authRoutes)
app.use('/Todo', todoGet); // rota base para as tarefas
app.use('/Todo', userRoutes); // rota base para usuários

// conexão com o MongoDB
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/ToDoList');
    console.log('Conexão com o MongoDB estabelecida com sucesso.');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
  }
}

main(); // chama a funcao de conexao

// middleware de tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // log do erro no console
  res.status(500).json({ message: 'Algo deu errado!', error: err.message });
});

// inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
