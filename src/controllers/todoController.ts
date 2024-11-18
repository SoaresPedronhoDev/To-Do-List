import { Request, Response } from 'express';
import path from 'path'


export const todoGet = (req : Request, res : Response): void => {
  const filePath = path.join(__dirname,'../../public/todoWelcome.html')
  res.sendFile(filePath)
}

