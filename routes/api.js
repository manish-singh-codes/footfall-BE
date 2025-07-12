import express from 'express';
import SensorData from '../models/SensorData.js';
import Device from '../models/Device.js';

const router = express.Router();

// 1. POST /sensor-data
router.post('/sensor-data', async (req, res) => {
  const { sensor_id, timestamp, count } = req.body;

  const data = new SensorData({ sensor_id, timestamp, count });
  await data.save();

  // Update device's last seen time
  await Device.findOneAndUpdate(
    { sensor_id },
    { last_seen: timestamp },
    { upsert: true, new: true }
  );

  res.status(201).json({ message: 'Sensor Data Recorded' });
});

// 2. GET /analytics
router.get('/analytics', async (req, res) => {
  const data = await SensorData.aggregate([
    {
      $group: {
        _id: {
          sensor_id: '$sensor_id',
          hour: { $hour: '$timestamp' },
        },
        total_count: { $sum: '$count' },
      },
    },
    {
      $project: {
        sensor_id: '$_id.sensor_id',
        hour: '$_id.hour',
        total_count: 1,
        _id: 0,
      },
    },
  ]);

  res.json(data);
});

// 3. GET /devices
router.get('/devices', async (req, res) => {
  const devices = await Device.find({});
  const now = new Date();
  const THRESHOLD_MINUTES = 10;
  const result = devices.map((device) => ({
    sensor_id: device.sensor_id,
    last_seen: device.last_seen,
    status: (now - device.last_seen < THRESHOLD_MINUTES * 60 * 1000) ? 'active' : 'inactive',

  }));

  res.json(result);
});

export default router;
