
import {Request, Response} from 'express'
import path from 'path'

export const todoRegisterRouteGet = (req : Request, res : Response) : void =>{
    const filePath = path.join(__dirname,'../../public/todoRegister.html') // passa o caminho html pra usar
    res.sendFile(filePath)
}