# keycloak-login
This is a Vue Project that implements the `keycloak-js` libary.

### Setting up keycloak
1. Create a new realm (in our case 'test')
2. Create a new client (client id 'vue-app')<br>
   a. Client authentication (off 'public')<br>
   b. Standard flow and Direct access (check)<br>
   c. Access settings<br>
     Valid redirect URIs<br>
     I. `http://127.0.0.1:5173/*`<br>
     II. `http://localhost:5173/*`<br>
     Web origins<br>
     I. `http://127.0.0.1:5173`<br>
     II. `http://localhost:5173`<br>
3. Create a user<br>

### main.js
```
import "@/assets/main.css";
import { createApp } from 'vue';
import App from './App.vue';
import Keycloak from 'keycloak-js';

let initOptions = {
    url: 'http://127.0.0.1:8081/',
    realm: 'test',
    clientId: 'vue-app',
    onLoad: 'login-required',
};

let keycloak = new Keycloak(initOptions);


keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        console.log("Authenticated");

        const app = createApp(App);
        app.config.globalProperties.$keycloak = keycloak; // Provide keycloak instance to the entire app
        app.mount('#app');
    }
    // Token Refresh
    setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.log('Token refreshed: ' + refreshed);
            } else {
                console.log(
                    'Token not refreshed, valid for ' +
                    Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) +
                    ' seconds'
                );
            }
        }).catch(() => {
            console.log('Failed to refresh token');
        });
    }, 6000);
}).catch(() => {
    console.log("Authentication Failed");
});
```
