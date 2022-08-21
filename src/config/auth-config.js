import auth0 from 'auth0-js';

export const webAuth = new auth0.WebAuth({
    domain: "dev-qurience.eu.auth0.com",
    clientID: "RPW2O1pe5dziciz9oHleDPk7KGoHPIYG",
    // redirectUri: `http://localhost:3000/#/customer-dashboard`,
    // responseType: "token id_token",
    // connection: 'Username-Password-Authentication',
    // scope: "openid profile email offline_access"
});