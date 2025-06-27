import mongoose from 'mongoose';

const SummaryScheme = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Summary', SummaryScheme);
