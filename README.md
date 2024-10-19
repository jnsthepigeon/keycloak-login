# keycloak-login
This is a Vue Project that implements the `keycloak-js` libary.

### Setting up keycloak
1. Create a new realm (in our case 'test')
2. Create a new client (client id 'vue-app')
   a. Client authentication (off 'public')
   b. Standard flow and Direct access (check)
   c. Access settings
     Valid redirect URIs
     I. http://127.0.0.1:5173/*
     II. http://localhost:5173/*
     Web origins
     I. http://127.0.0.1:5173
     II. http://localhost:5173
3. Create a user
