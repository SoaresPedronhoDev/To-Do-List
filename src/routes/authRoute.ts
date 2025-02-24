

import express, { Router } from 'express'
import passport from 'passport'

const router = express.Router()

//rota pra autenticacao com o google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//rota de redirecionamento após login com o google
router.get(
    '/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req,res) =>{
        res.redirect('/')
    }
);

router.get('/auth/current-user',(req,res) =>{
    if(req.user){
        res.json({ user : req.user})
    } else {
        res.status(401).json({ message : 'Not authenticated'})
    }
});

export default Router