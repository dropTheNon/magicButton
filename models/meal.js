var mongoose = require('mongoose');

var MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: Array,
  published: Boolean,
  ingredients: { type: Array, required: true }
});

module.exports = mongoose.model('Meal', MealSchema);