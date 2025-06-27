import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import SummaryRoutes from './routes/SummaryRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/summaries/', SummaryRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to mongo db');
    app.listen(3030, () => {
      console.log('running on host 3030');
    });
  })
  .catch((err) => console.log(err));
