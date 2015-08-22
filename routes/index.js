import * as cradle from './api/cradle';
import * as mood   from './api/mood';
import * as user   from './api/user';

export default function (app) {

  // User
  app.post('/register', user.register);
  app.post('/login', user.auth);
  app.post('/loadAuth', user.loadAuth);

  // Mood
  app.get('/moods', mood.moods);
  app.post('/moods', mood.addMood);

}
