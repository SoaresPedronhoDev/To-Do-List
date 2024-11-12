import express , {Request,Response,NextFunction} from 'express'

const app = express()
const PORT = 5001

app.get('/',(req,res) =>{

    res.send('Hello World')

})


app.listen(PORT, () =>{
    console.log('Server is running on PORT 5001')
})