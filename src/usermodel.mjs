import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  origin: String,
  authId: String,
  username: String,
  photoUrl: String,
});

const User = mongoose.model('user', userSchema);

export default User;
