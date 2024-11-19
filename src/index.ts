import express , {Request,Response,NextFunction} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import todoGet from './routes/todoRoute'

dotenv.config()

const app = express()
const PORT = 5001

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/Todo',todoGet)


app.listen(PORT, () =>{
    console.log('Server is running on PORT 5001')
})