import passport from 'passport';
import Local from 'passport-local';
import bcrypt from 'bcrypt';

import { getUserByEmail, getUserById } from '~/db/actions/user.action';

const LocalStrategy = Local.Strategy;

const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email: string, password: string, done: Function) => {
        try {
          if (!email || !password) {
            return done(null, false, { message: 'Missing required parameter' });
          }

          const user = await getUserByEmail(email).select('+password');

          if (!user) {
            return done(null, false, {
              message: 'No user found with that email',
            });
          }

          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: 'Incorrect password' });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user: Record<string, any>, done: Function) => {
    return done(null, user._id.toString());
  });

  passport.deserializeUser(async (id: string, done: Function) => {
    return done(null, await getUserById(id));
  });
};
export default initializePassport;
