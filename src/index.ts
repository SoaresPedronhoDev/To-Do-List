
import express, {Request,Response} from 'express'

const app = express()
const PORT = process.env.PORT || 5001

app.get('/',(req,res) =>{
    res.send('Hellor World')
})

app.listen(PORT,() =>{
    console.log('Server is Running ')
})

