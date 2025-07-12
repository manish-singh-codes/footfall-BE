import axios  from 'axios';
import dotenv from 'dotenv';
dotenv.config();


async function sendData(sensor_id) {
  const payload = {
    sensor_id,
    timestamp: new Date(),
    count: Math.floor(Math.random() * 100),
  };

  try {
    const res = await axios.post(`${process.env.BASE_URL}/api/sensor-data`, payload);
    console.log(`Data sent for ${sensor_id}:`, payload);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Send Data every hour
setInterval(() => {
  sendData('sensor1');
  sendData('sensor2');
}, 3600000);  
