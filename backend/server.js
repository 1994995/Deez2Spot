const express = require('express');
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const deezerService = require('./deezerService');
const spotifyService = require('./spotifyService');
const randomService = require('./randomService');
const app = express();
const port = 3000;

require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.use(cors());  // Enable CORS

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

app.get('/api/test-auth', (req, res) => {
  const result = deezerService.testAuthMethod();
  res.json(result);
});


// DEEZER ROUTES
app.get('/api/deezer/albums/:deezerUID', async (req, res) => {
  const deezerUID = req.params.deezerUID;
  const albums = await deezerService.getAlbums(deezerUID);
  res.json(albums);
});

app.get('/api/deezer/playlists/:deezerUID', async (req, res) => {
  const deezerUID = req.params.deezerUID;
  const playlists = await deezerService.getPlaylists(deezerUID);
  res.json(playlists);
});

app.get('/api/deezer/artists/:deezerUID', async (req, res) => {
  const deezerUID = req.params.deezerUID;
  const artists = await deezerService.getArtists(deezerUID);
  res.json(artists);
});


// SPOTIFY LOGIN
app.get('/api/login', function(req, res) {

  var state = randomService.generateRandomString(16);
  var scope = 'user-library-modify user-library-read user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (!state || !code) {
    // Handle error: missing code or state
    return res.status(400).json({
      error: 'state_mismatch',
      message: 'The state or code parameter is missing or invalid.'
    });
  }

  try {
    // Set up the token exchange request
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + 
            Buffer.from(client_id + ':' + client_secret).toString('base64')
        }
      }
    );

    // Extract tokens from the response
    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Log the tokens (replace with secure storage in production)
    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);

    // Redirect the user to the Angular app's callback route with tokens as query parameters
    res.redirect(`http://localhost:4200/callback?access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);

  } catch (error) {
    // Handle errors
    console.error('Error during token exchange:', error.response?.data || error.message);

    return res.status(500).json({
      error: 'invalid_token',
      message: 'An error occurred while exchanging the authorization code for tokens.'
    });
  }
});


// SPOTIFY
app.get('/api/spotify', async (req, res) => {
  const { q, type } = req.query; // Extract the query parameters
  const accessToken = req.headers.authorization?.split(' ')[1]; // Extract the Bearer token
  if (!q || !type || !accessToken) {
    return res.status(400).json({ error: 'Missing required query parameters or access token' });
  }

  return res.json(spotifyService.saveForUser(q.replace(' ', '%20'), type, accessToken));

  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
