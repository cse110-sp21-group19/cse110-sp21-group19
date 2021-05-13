# How to implement Google sign-in
Documentation: [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in)
## Frontend HTML
- In `<head>`:
  - `<script src="https://apis.google.com/js/platform.js" async defer></script>`
    - Loads the Google Platform Library
  - `<meta name="google-signin-client_id" content="347307540110-o3m1psplm7abvjicak40v88rhjdi6cun.apps.googleusercontent.com">`
    - Specifies our Google client ID
- In `<body>`:
  - `<div class="g-signin2" data-onsuccess="onSignIn"></div>`
    - Automatically creates a sign-in button
    - To create a more customized button, see [here](https://developers.google.com/identity/sign-in/web/build-button)
  - Optional sign out script (need to create a button that calls this function):
    ```
    <script>
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    </script>
    ```
## Frontend JS
- To access a user's ID Token and profile information:
    ```
    if (auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        var id_token = auth2.currentUser.get().getAuthResponse().id_token;
    }

    ```
- Once you have a profile variable, you can access their data for frontend use using:
  - `profile.getName()`
  - `profile.getId()` (Note: don't send this to backend, send id_token)
  - `profile.getImageUrl()`
  - `profile.getEmail()`
- Send id_token to the backend using an HTTP POST request:
    ```
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://yourbackend.example.com/User');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + id_token);
    ```
## Backend
- Once the ID token is received, extract its information using [Google API Client Libraries](https://github.com/google/google-api-javascript-client)
  - Install using `npm install google-auth-library --save`
  - Use the function verifyIdToken():
    ```
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify().catch(console.error);
    ```
  - In this example, `userid` stores the user's ID we can use to identify them in the database
  - Can also access `payload["email"]`, `payload["name"]`, and `payload["picture"]`
  - Note: If we don't use this, we would need to find out how to extract information from the token and manually verify its signature, client ID, expiration, and issuer