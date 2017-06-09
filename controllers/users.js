 const
  User = require('../models/User.js'),
  serverAuth = require('../config/serverAuth.js'),
  Drawings = require('../models/Drawing.js')

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}

function index(req, res){
  User.findById(req.params.id, (err, users) => {
    Drawings.find({}).populate('user').exec((err,drawings) =>{
      if (err) return console.log(err)
      res.json({message: 'all users', users, drawings})
    })
  })
}

function show(req, res) {
  User.findById(req.params.id, (err, user) => {
    res.json(user)
  })
}

function create(req, res) {
  User.create(req.body, (err, user) => {
    const userData = user.toObject()
    delete userData.password

    const token = serverAuth.createToken(userData)
    res.json({success: true, message: 'Usser Account Created', user, token})
  })
}

function update(req, res) {
  User.findById(req.params.id, (err, user) => {
    if(err) return console.log(err)
    Object.assign(user, req.body)
    user.save((err) => {
      res.json({success: true, message:'User Info Updated', user})
    })
  })
}

function destroy(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if(err) return console.log(err)
    res.json({success: true, message:'User Account Deleted'})
  })
}
