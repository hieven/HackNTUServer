export default function(mongoose) {
  return mongoose.Schema({
    username: String,
    account:  String,
    password: String,
    createdAt: {
      type:    Date,
      default: Date.now
    },
    updateAt: {
      type:    Date,
      default: Date.now
    }
  });
}
