const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  drawingsRoutes = require('./routes/drawings.js'),
  cors = require('cors'),
  port = process.env.PORT || 3001,
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project04'

mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'Connected to MongoDB.')
})

app.use(logger('dev'))

app.use(cors())

// app.all('*', function(req, res, next){
//   res.setHeader('Access-Controll-Allow-Orgin', '*')
//   res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PATCH, DELETE')
//   res.setHeader('Access-Controll-Allow-Headers', 'X-Requested-With, content-type')
//   res.setHeader('Access-Controll-Allow-Credentials', true)
//
//   next()
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extedned: false}))

app.get('/', (req, res) => {
  res.json({message: "Server root. All API routes start with /api"})
})

app.use('/api/users', usersRoutes)
app.use('/api/drawings', drawingsRoutes)

app.listen(port, (err) => {
  console.log(err || `Server running on ${port} 🎉`)
})
