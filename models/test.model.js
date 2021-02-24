const mongoose = require('mongoose');

const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const clusterSchema = new schema({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: [true, 'There can only be one record with this id'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  liked: {
    type: Boolean,
    required: [true, 'Liked is required'],
  },
  visited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('people', clusterSchema);
