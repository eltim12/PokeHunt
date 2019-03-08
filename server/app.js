require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemon')

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'poke';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));

app.post('/tokensignin', function(req, res) {
  client
    .verifyIdToken({
      idToken: req.body.idtoken,
      audience: process.env.CLIENT_ID,
    })
    .then(function(ticket) {

      // Get user information from Google
      const { email, name, picture } = ticket.getPayload();

      // Generate jsonwebtoken for requesting your own endpoints (routes)
      const accessToken = jwt.sign({ email }, JWT_SECRET);

      app.use("/pokemon", pokemonRoutes)

      res.status(200).json({ email, name, picture, accessToken });
    })
    .catch(function(error) {
      res.status(500).json({
        msg: 'Internal server error, check your console on server',
      })
    });
})

app.listen(port, function() {
  console.log('Listening on port', port);
});