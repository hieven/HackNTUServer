// Models
const Mood = require('../../models').Mood;

export function moods(req, res) {
  let cookies = req.headers.cookie;
  let user_id = null;
  cookies = cookies.split(';');
  cookies.map(function(cookie) {
    if (cookie.indexOf('user_id') !== -1) {
      user_id =  cookie.split('=')[1];
    }
  });
  if (!user_id) {
    return res.json(null);
  }

  Mood.find({user_id: user_id}).sort({'createdAt': -1}).exec((err, moods) => {
    if (err) {
       return res.json(err);
    }
    let old_moods = [];
    if (moods.length > 3) {
      old_moods = moods.slice(3);
    }
    const daily_moods = moods.slice(0, 3);
    const old_mood = old_moods[Math.floor(Math.random() * old_moods.length)];
    res.json({
      daily_moods,
      old_mood
    });
  });
}

export function addMood(req, res) {
  let cookies = req.headers.cookie;
  let user_id = null;
  cookies = cookies.split(';');
  cookies.map(function(cookie) {
    if (cookie.indexOf('user_id') !== -1) {
      user_id =  cookie.split('=')[1];
    }
  });
  if (!user_id) {
    return res.json(null);
  }

  let data = req.body.mood;
  data['user_id'] = user_id;
  const mood = new Mood(data);
  
  console.log(mood);
  mood.save(function(err, mood) {
    if (err) {
      console.log(err);
    }
    res.json(data);
  });
}