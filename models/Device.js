import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  sensor_id: String,
  last_seen: Date,
});

const Device = mongoose.model('Device', deviceSchema);

export default Device;
