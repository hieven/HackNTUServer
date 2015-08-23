// Models
const User = require('../../models').User;


export function register(req, res) {
  const data = req.body;
  const user = new User(data);

  user.save(function(err, user) {
    if (err) {
      console.log(err);
    }
    res.json({
      user_id: user.id,
      username: user.username
    });
  });
}


export function auth(req, res) {
  const {account, password} = req.body;
  User.findOne({
    account: account,
    password: password
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    console.log('login success');
    res.json({
      user_id: user.id,
      username: user.username
    });

  });
}

export function loadAuth(req, res) {
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

  User.findOne({_id: user_id}, function(err, user) {
    console.log(user);
    res.json({
      username: user.username,
      user_id: user.id
    });
  });
}
