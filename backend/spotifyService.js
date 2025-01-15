const axios = require('axios');

module.exports = {
    testAuthMethod: () => {
      console.log("Authentication logic called");
      return { status: 'success', message: 'Authentication method tested successfully' };
    },

    getAlbums: (deezerUID) => {
        console.log(`GET https://api.deezer.com/user/${deezerUID}/albums?limit=-1`)
        return axios.get(`https://api.deezer.com/user/${deezerUID}/albums?limit=-1`)
            .then(response => response.data )
            .catch(error => { throw error; });
    },

    getPlaylists: (deezerUID) => {
        console.log(`GET https://api.deezer.com/user/${deezerUID}/playlists?limit=-1`)
        return axios.get(`https://api.deezer.com/user/${deezerUID}/playlists?limit=-1`)
            .then(response => response.data )
            .catch(error => { throw error; });
    },

    getArtists: (deezerUID) => {
        console.log(`GET https://api.deezer.com/user/${deezerUID}/artists?limit=-1`)
        return axios.get(`https://api.deezer.com/user/${deezerUID}/artists?limit=-1`)
            .then(response => response.data )
            .catch(error => { throw error; });
    }
    
  };