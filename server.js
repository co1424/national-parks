const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


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


/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST;
const mongdb = process.env.MONGO_URI;



//  Testing Server
app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// Error handling: 
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});



//  Connect to mongoDB
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