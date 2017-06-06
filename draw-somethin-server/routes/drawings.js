const
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  fs = require('fs'),
  Drawing = require('../models/Drawing.js'),
  authorize = require('../config/serverAuth.js').authorize,
  drawingRouter = new express.Router()

drawingRouter.use(bodyParser({uploadDir:'./temp_dir'}));


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
drawingRouter.post('/upload', (req, res) => {
  var tempPath = req.files.file.path
      targetPath = path.resolve('./uploads/:imgID')
  if(path.extname(req.files.file.name).toLowerCase() === '.png') {
    fs.rename(tempPath, targetPath, (err) => {
      if(err) throw err
      console.log('upload complete');
    })
  } else {
      fs.unlink(tempPath, (err) => {
        if(err) throw err
        console.log('nope not gonna happen')
      })
    }

  res.json({success: true, message: 'drawing uploaded'})
})

  drawingRouter.route('/:id')
    .delete((req, res) => {
      Drawing.findByIdAndRemove(req.params.id, (err, drawing) => {
        res.json({success: true, message: 'Drawing Deleted', drawing})
      })
    })

module.exports = drawingRouter
