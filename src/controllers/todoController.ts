import { Request, Response } from 'express';
import path from 'path'


export const todoGet = (req : Request, res : Response): void => {

  try{
  
  const filePath = path.join(__dirname,'../../public/todoWelcome.html') // passa o caminho do html para usar
  res.sendFile(filePath) //retorna o html 

  }catch(error){
    res.status(500).json({message: 'Error fetching todo', error})
  }
  
}
