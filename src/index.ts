import express , {Request,Response,NextFunction} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import todoGet from './routes/todoRoute'

dotenv.config()

const app = express()
const PORT = 5001 // porta do servidor

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))// serve caminhos estaticos da pasta public
app.use('/Todo',todoGet)// usa a rota localhost:5001/Todo como base


app.listen(PORT, () =>{
    console.log('Server is running on PORT 5001')// roda o servidor e manda mensagem de inicializacao
})