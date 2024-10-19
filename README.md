# keycloak-login
This is a Vue Project that implements the `keycloak-js` libary.

### Setting up keycloak
1. Create a new realm (in our case 'test')
2. Create a new client (client id 'vue-app')<br>
   a. Client authentication (off 'public')<br>
   b. Standard flow and Direct access (check)<br>
   c. Access settings<br>
     Valid redirect URIs<br>
     I. http://127.0.0.1:5173/\*<br>
     II. http://localhost:5173/\*<br>
     Web origins<br>
     I. http://127.0.0.1:5173<br>
     II. http://localhost:5173<br>
3. Create a user<br>
