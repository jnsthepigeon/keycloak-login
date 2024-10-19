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