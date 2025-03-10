// src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import passport from './config/passport';
import authRoutes from './routes/authRoute';
import todoGet from './routes/todoRoute';
import userRoutes from './routes/userRoutes'; 
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = 5001; // porta do servidor

// middleware para parsing de JSON
app.use(express.json());

//configuracoes do express-session

app.use(
  session({
    secret: 'chave_secreta',
    resave : false,
    saveUninitialized : false,
    cookie : { secure : false },
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
    await mongoose.connect('mongodb://localhost:27017/to-do-list');
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