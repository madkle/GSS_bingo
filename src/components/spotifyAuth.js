// spotifyAuth.js
export const CLIENT_ID = "da23bdf5b4334272a1dc8e48abb73409";
export const CLIENT_SECRET = "cfc99605c4324f83a2e5759931e707ec";
export const REDIRECT_URI = "http://localhost:3000";
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=playlist-read-private`;

// Redirect the user to this URL for authorization
export const authorizeUrl = AUTH_URL;
