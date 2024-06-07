import passport from 'passport';
import Local from 'passport-local';

import { findUserByEmail, findUserById } from '~/db/actions/user.action';
import { UserInterface } from '~/db/models/user.model';

const LocalStrategy = Local.Strategy;

const initializePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await findUserByEmail(email);

          if (!user) {
            return done(null, false, { message: 'Invalid credentials' });
          }

          const isMatch = await (user as UserInterface).comparePassword(
            password,
          );

          if (!isMatch) {
            return done(null, false, { message: 'Invalid credentials' });
          }

          return done(null, (user as UserInterface).toJSON());
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, (user as UserInterface)._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await findUserById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};
export default initializePassport;
