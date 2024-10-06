import mongoose from 'mongoose';

const aiSchema = new mongoose.Schema({
  userQuery: {
    type: String,
    required: true,
  },
  aiResponse: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AiModel = mongoose.model('AI', aiSchema);

export { AiModel };
