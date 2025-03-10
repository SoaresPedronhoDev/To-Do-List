
import express from 'express';
import passport from 'passport';
import User from '../models/User';

const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/Todo/register' }),
  async (req, res) => {
    try {
      const profile = req.user as any; 
      console.log('Perfil do Google:', profile); 
      let user = await User.findOne({ googleId: profile.id });
      console.log('Usuário encontrado:', user); 

      if (!user) {
        user = new User({
          googleId: profile.id,
          email: profile.emails?.[0].value, 
          displayName: profile.displayName,
        });

        await user.save();
        console.log('Usuário criado com sucesso:', user); 
      }

      res.redirect('/');
    } catch (error) {
      console.error('Erro durante o callback do Google:', error);
      res.redirect('/Todo/register');
    }
  }
);

export default router;