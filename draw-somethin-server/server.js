const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  usersRoutes = require('./routes/users.js'),
  drawingsRoutes = require('./routes/drawings.js'),
  cors = require('cors'),
  mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project04',
  port = process.env.PORT || 3001

mongoose.connect(mongoUrl, (err) => {
  console.log(err || 'Connected to MongoDB.')
})

app.use(logger('dev'))

app.use(cors())

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
