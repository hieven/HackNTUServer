export default {
  enviroment: 'development',
  port      : (process.env.PORT || 3000),
  mongo     : {
    database   : 'DATABASE',
    host       : '127.0.0.1'
  }
};