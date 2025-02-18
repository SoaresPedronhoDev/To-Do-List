import { Request, Response } from 'express';
import path from 'path'


export const todoGet = (req : Request, res : Response): void => {
  const filePath = path.join(__dirname,'../../public/todoWelcome.html') // passa o caminho do html para usar
  res.sendFile(filePath) //retorna o html 
}
