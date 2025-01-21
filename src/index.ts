import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import todoGet from './routes/todoRoute';
import mongoose from 'mongoose';
import { error } from 'console';

dotenv.config();

const app = express();
const PORT = 5001; // porta do servidor (não 27017, que é a porta do MongoDB)

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // serve caminhos estaticos da pasta public
app.use('/Todo', todoGet); // usa a rota localhost:5001/Todo como base

// Mongoose connection
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/to-do-list', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('The connection is OK');
  } catch (err) {
    console.log('Error connecting to MongoDB:', err);
  }
}

main(); // Chama a função de conexão

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`); // inicializa o servidor na porta 5001
});
