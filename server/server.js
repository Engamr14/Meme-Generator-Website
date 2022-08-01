'use strict';
const express = require('express');
const morgan = require('morgan');
const { check, validationResult } = require('express-validator'); // validation middleware
const dao = require('./dao.js');

/* --- Authentication related imports ---- */
const passport = require('passport');
const passportLocal = require('passport-local');
const userDao = require('./user_dao');
const session = require('express-session'); // session middleware

// init express
const app = new express();
const port = 3001;

// Using morgan
app.use(morgan('dev'));
app.use(express.json());


/* --- Basic Passport configuration ---- */
passport.use(new passportLocal.Strategy((username, password, done) => {
  // verification callback for authentication
  userDao.getUser(username, password).then(user => {
    if (user)
      done(null, user);
    else
      done(null, false, { message: 'Wrong username or password' });
  }).catch(err => {
    done(err);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});


// starting from the data in the session, extract current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err, null);
    });
});


const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'not authenticated' });
}


// initialize and configure HTTP sessions
app.use(session({
  secret: 'this is my secret',
  resave: false,
  saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());


/****** Meme APIs ******/

// GET /Home/Public
app.get('/Home/Public', async (req, res) => {
  try {
    const result = await dao.getPublicMemes();
    if (result.error) {
      res.status(404).json(result);
      console.log(result);
    }
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /Home/All
app.get('/Home/All', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getAllMemes();
    if (result.error)
      res.status(404).json(result);
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET /MyPage/:user
app.get('/MyPage/:user', isLoggedIn, async (req, res) => {
  try {
    const result = await dao.getMemesByUser(req.params.user);
    if (result.error) {
      result = [];
      res.status(404).json(result);
    }
    else
      res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// DELETE /Home/:key
app.delete('/Home/:key', isLoggedIn, async (req, res) => {
  await dao.deleteMeme(req.params.key)
    .then(() => res.status(250).end())
    .catch(error => res.status(550).json(error))
});

// POST /CreateMeme
app.post('/CreateMeme', [
  check('fontSize').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await dao.addMeme({
      user: req.body.user, title: req.body.title, imgID: req.body.imgID, text1: req.body.text1, text2: req.body.text2,
      fontFamily: req.body.fontFamily, fontSize: req.body.fontSize, fontColor: req.body.fontColor, visibility: req.body.visibility
    });
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation` });
  }
});

/* --- AddUser API ---- */

// POST /AddUser
app.post('/AddUser', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    await userDao.addUser({ email: req.body.email, name: req.body.name, password: req.body.password, phoneNumber: req.body.phoneNumber });
    res.status(201).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation` });
  }
});

// GET /CheckUserName
app.get('/CheckUserName/:name', async (req, res) => {
  try {
    const result = await userDao.getUserNames();
    if (result.error) {
      res.status(404).json('true');
    }
    else {
      if (result.includes(req.params.name))
        res.json('false');
      else
        res.json('true');
    }

  } catch (err) {
    res.status(500).end();
  }
});


/* --- Login APIs ---- */

// Login
app.post('/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});


// GET /sessions/current
app.get('/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});

// Logout
app.delete('/sessions/current', (req, res) => {
  req.logout();
  res.end();
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});