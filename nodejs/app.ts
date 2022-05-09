const express = require('express');
const CosmosClient = require('@azure/cosmos').CosmosClient;
const config = require('./config');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const Arweave = require('arweave');
const bodyParser = require('body-parser');

const AuthRoute = require('./routes/auth')
const AuthModel = require('./models/auth')

const PapersRoutes = require('./routes/papers')

const app = express()

app.use(helmet())
app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const cosmosClient = new CosmosClient({
  endpoint: config.host,
  key: config.authKey
})

const AuthData = new AuthModel(cosmosClient, config.databaseId, config.containerId)
const Auth = new AuthRoute(AuthData)
const Papers = new PapersRoutes()

AuthData
  .init(err => console.error(err))
  .catch(err => {
    console.error(err)
    process.exit(1) // Shutting down because there was an error settinig up the database
  })

app.post('/api/v1/login', (req, res) => Auth.login(req, res))
app.post('/api/v1/createUser', (req, res) => Auth.createUser(req, res))
app.get('/api/v1/getNonce', (req, res) => Auth.getNonce(req, res))
app.get('/api/v1/getUser', (req, res) => Auth.getUser(req, res))      // auth check

// catch 404 and forward to error handler
app.use(function(req, res) {
  const err = new Error('Not Found')
  res.status(404).send(err.message)
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err.message)
})

const port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
