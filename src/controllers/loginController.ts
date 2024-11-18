import { Request, Response } from 'express';


export const todoGet = (req : Request, res : Response): void => {
  res.send('Is okay')
}

// Função para GET "/login"
export const loginGet = (req: Request, res: Response): void => {
  res.send('Login page (GET)');
};

// Função para POST "/login"
export const loginPost = (req: Request, res: Response): void => {
  // Aqui você pode adicionar lógica para autenticação do usuário
  res.send('Login (POST)');
};

// Função para GET "/register"
export const registerGet = (req: Request, res: Response): void => {
  res.send('Register page (GET)');
};

// Função para POST "/register"
export const registerPost = (req: Request, res: Response): void => {
  // Aqui você pode adicionar lógica para registrar um novo usuário
  res.send('Register (POST)');
};