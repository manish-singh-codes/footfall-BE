import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Allow all origins
  credentials : true, // Allow credentials
};

app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/footfallDB')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
