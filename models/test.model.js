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
  age: {
    type: String,
    required: [true, 'Age is required'],
  },
  img: {
    type: String,
    required: [true, 'Image is required'],
  },
  residence: {
    type: String,
    required: [true, 'Residence is required'],
  },
  product: {
    type: String,
    required: [true, 'Product is required'],
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

module.exports = mongoose.model('users', clusterSchema);
// users stands for collection in database
