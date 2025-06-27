import mongoose from 'mongoose';
import express from 'express';
import Summary from '../models/Summary.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { userId, title, summary } = req.body;
    const newSummary = new Summary({ userId, title, summary });
    const savedSummary = await newSummary.save();
    res.status(201).json(savedSummary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const summaries = await Summary.find();
    res.status(200).json(summaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
