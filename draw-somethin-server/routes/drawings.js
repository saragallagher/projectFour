const
  express = require('express'),
  Drawing = require('../models/Drawing.js'),
  authorize = require('../config/serverAuth.js').authorize,
  drawingRouter = new express.Router()

  drawingRouter.route('/all')
  .get ((req,res)=> {
    Drawing.find({}).sort('createdAt').exec((err,drawings) =>{
      res.json(drawings)
    })
  })

drawingRouter.use(authorize)


drawingRouter.route('/')
  .get((req, res) => {
    Drawing.find({user: req.decoded._id}, (err, drawings) => {
      res.json(drawings)
    })
  })
  .post((req, res) => {
    const newDrawing = new Drawing(req.body)
    newDrawing.user = req.decoded._id
    newDrawing.save((err, drawing) => {
      res.json({success: true, message: 'Drawing Created', drawing})
    })
  })

drawingRouter.route('/:id')
    .delete((req, res) => {
      Drawing.findByIdAndRemove(req.params.id, (err, drawing) => {
        res.json({success: true, message: 'Drawing Deleted', drawing})
      })
    })

module.exports = drawingRouter
