
import express from 'express';
import passport from 'passport';
import User from '../models/User';

const router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/Todo/register' }),
  async (req, res) => {
    try {
      const profile = req.user as any; 
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          email: profile.emails?.[0].value, 
          displayName: profile.displayName,
        });
        await user.save();
      }
      res.redirect('/');
    } catch (error) {
      console.error('Erro durante o callback do Google:', error);
      res.redirect('/Todo/register');
    }
  }
);

export default router;