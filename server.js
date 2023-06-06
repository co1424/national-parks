const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { auth } = require('express-openid-connect');
const router = new express.Router();
const parksController = require('./controllers/parksController');
const { parkValidationRules, validate } = require('./validation/validator');
const { requiresAuth } = require('express-openid-connect');

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST;
const mongdb = process.env.MONGO_URI;
const secret = process.env.SECRET;


/* *********************** */
// OAuth Authentication:
/* *********************** */
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: 'http://https://national-parks-1pmq.onrender.com/', //Change this when you deploy the site to the actual render.com link!
  clientID: 'sUhtq5Cvif46oQctPhi0034RD1y3qFLe',
  issuerBaseURL: 'https://dev-kvzusgguf0m4mi2x.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'You are currently logged in' : 'You are currently logged out');
});

// Updates a contact by id // requiresAuth checks authentication. // Returns to /login if not authenticated.
app.put('/park/:id', requiresAuth(), parkValidationRules(), validate, (req, res) => {
  if (req.oidc.isAuthenticated()) {
    parksController.updateParkById(req, res);
  } else {
    res.redirect('/login'); // Redirect to the login page if not authenticated
  }
});

// Deletes a contact by id // requiresAuth checks authentication. // Returns to /login if not authenticated.
app.delete('/park/:id', requiresAuth(), (req, res) => {
  if (req.oidc.isAuthenticated()) {
    parksController.deleteParkById(req, res);
  } else {
    res.redirect('/login'); // Redirect to the login page if not authenticated
  }
});

// Middleware to show error message if used failed to authenticate:
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized! Please login to authenticate. Go to: https://national-parks-1pmq.onrender.com/login'); // Sending a shorter error message for 401 Unauthorized
  } else {
    next(err);
  }
});



/* *********************** */
/* *********************** */
/* *********************** */



app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //This * is to allow any site to access my API.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', require('./routes/parksRoutes.js'));


//  Testing Server
app.get('/', (req, res) => {
  res.send(`Server is up and working at ${host}:${port}!`);
});

/* *********************** */
// Error handling: 
/* *********************** */
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});


/* *********************** */
//  Connect to mongoDB
/* *********************** */
mongoose.connect(mongdb, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(port, () => {
      console.log(`App listening on ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });