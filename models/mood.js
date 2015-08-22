export default function(mongoose) {
  return mongoose.Schema({
    emotion:   String,
    depiction: String,
    longitude: Number,
    latitude:  Number,
    user_id:   mongoose.Schema.Types.ObjectId,
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
