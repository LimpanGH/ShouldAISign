console.log('Reading eulaModels.ts');

import mongoose from 'mongoose';

const EulaSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: Date,
  finishedBy: Date, //datum eller en kopplat till en person?
});

const EulaModel = mongoose.model('Eula', EulaSchema);

export { EulaSchema, EulaModel };
