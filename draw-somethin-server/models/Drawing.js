const
  mongoose = require('mongoose'),
  drawingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    url: String
  })

  const Drawing = mongoose.model('Drawing', drawingSchema)
  module.exports = Drawing
