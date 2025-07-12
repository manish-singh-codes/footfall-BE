import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  sensor_id: String,
  timestamp: Date,
  count: Number,
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
