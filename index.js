const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
const path = require('path');

require('dotenv').config();

const app = express();

app.use(express.static("public"))

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var corsOptions = {
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://krishnatodos.herokuapp.com',
  ],
};
// use cors options
app.use(cors(corsOptions));

app.use(require('cookie-parser')());
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// database
const db = require('./app/models');
const User = db.user;
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
      .populate('roles', '-__v')
      .exec((err, user) => {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        var passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        // user details
        const user_information = {
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
        };

        return done(null, user_information);
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected to the database!');
    initialize();
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

let users = [
  {
    username: 'Michelle Kennedy',
    password: 'Ken!!',
  },
  {
    username: 'Joy Joe',
    password: 'Joe2020',
  },
  {
    username: 'Leon Yoa',
    password: '$lmutua$',
  },
  {
    username: 'Lenah Janet',
    password: 'mueni@L',
  },
  {
    username: 'Janet Joat',
    password: 'Ciku22',
  },
  {
    username: 'Ham Leah',
    password: 'Leha',
  },
];
function initialize() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      for (const key in users) {
        if (Object.hasOwnProperty.call(users, key)) {
          const element = users[key];
          new User({
            username: element.username,
            password: element.password,
          }).save((err) => {
            if (err) {
              console.log('error', err);
            }
            console.log(`added ${element.username} to users collection`);
          });
        }
      }
    }
  });
}
// routes

const todo = require('./app/routes/todo');
// todo routes
app.use('/api/todo', todo);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
