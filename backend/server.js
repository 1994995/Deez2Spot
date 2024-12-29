const express = require('express');
const cors = require('cors');
const deezerService = require('./deezerService');
const app = express();
const port = 3000;

app.use(cors());  // Enable CORS

app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the Node.js backend!" });
});

app.get('/api/test-auth', (req, res) => {
  const result = deezerService.testAuthMethod();
  res.json(result);
});

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
