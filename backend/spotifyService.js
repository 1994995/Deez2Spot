const axios = require('axios');

module.exports = {
    testAuthMethod: () => {
      console.log("Authentication logic called");
      return { status: 'success', message: 'Authentication method tested successfully' };
    },

    saveForUser: async (q, type, accessToken) => {
        try {
            // Make the request to the Spotify API
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${q}&type=${type}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const albumID = response.data.albums.items[0].id;

            const addRequest = await axios.put(
                `https://api.spotify.com/v1/me/albums?ids=${albumID}`,
                {}, // Empty body for this PUT request
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
        
            // Send the Spotify API response back to the client
            return addRequest;
          } catch (error) {
            console.error('Error making request to Spotify API:', error.response?.data || error.message);
            return { error: 'Failed to fetch data from Spotify API' };
          }
    }
    
  };