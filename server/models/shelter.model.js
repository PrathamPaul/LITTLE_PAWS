const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true, unique: true }, 
  shelterAdmin : {type : mongoose.Schema.ObjectId , ref : 'User'},
  contact: { type: String },
});

const Shelter = mongoose.model('Shelter', shelterSchema);
module.exports = Shelter
