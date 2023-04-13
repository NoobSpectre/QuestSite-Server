import mongoose, { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  notification: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Nofication = model('Nofication', notificationSchema);

export default Nofication;
