//= === Set Up
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var app = express();
var router = express.Router();
var cors = require('cors');


//= === set up Local

var config = require('./App/config')
var User = require('./App/Models/user')
var port = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// mongoose.connect('mongodb:://localhost/apiusers', {
//     useMongoClient: true
// })
// mongoose.connect(config.database, {
//   // useMongoClient: true
//   useNewUrlParser: true
// });

mongoose.connect("mongodb://127.0.0.1/admin", {
  useUnifiedTopology: true, 
  useNewUrlParser: true, 
  useCreateIndex: true 
});

app.set('secretKey', config.secret)
app.use(cors())

//= ============= Router API
router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.json({ succes: false, message: 'User tidak ada di database' })
    } else {
      // harusnya passwordnya hash
      if (user.password !== req.body.password) {
        res.json({ succes: false, message: 'password user salah!' })
      } else {
        // membuat token
        const token = jwt.sign({user}, app.get('secretKey'), {
          expiresIn: 5000
        })


        // ngirim balik token
        res.json({
          succes: true,
          message: 'token berhasil didapatkan!',
          token: token
        })
      }
    }
  })
})

router.get('/', function (req, res) {
  res.send('ini di route Home!')
})

router.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

// prefix /api
app.use('/api', router)

app.listen(4000)
