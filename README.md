# Smart Home
#### The smart-home automation system for control the smart devices of your entire home. <br>It's helping the users to achieve the best and comfortable atmosphere for their home.

### Technology stack:
* **BackEnd:** Node.js, Express
* **FrontEnd:** Materialize, React, Redux
* **DataBase:** Postgresql, Sequelize
* **Integration with devices:** Samsung SmartThings (https://graph.api.smartthings.com/)

### Installation
1. Clone this repository: <br>
   ```git clone git@gitlab.com:wemyit.trainee/dudko-maksym.git ```
2. Go to server folder and install deps: <br>
   ```cd server/ && npm install```
3. Setup environment variables in root_folder/server/.env: <br>
```
PORT=/*port where server run*/
DB_HOST=/*Database host name, for locale use 127.0.0.1*/ 
DB_USER=/*username for access to database*/
DB_PASSWORD=/*password for access to database*/
DB_NAME=/*database name*/
DB_NAME_TEST=/*database name for unit-tests*/
JWT_SECRET=/*secret word for JWT-token authentication*/
CLIENT_ID=/*client ID for SmartThings*/
CLIENT_SECRET=/*secret code for SmartThings*/
```
3. Run server: <br>
   ```npm start```
4. Go back to root folder:
   ```cd ../```
5. Go to client folder and install deps: <br>
   ```cd client/ && npm install && npm start```
6. Run client: <br>
   ```npm start```
7. Now you can test this awesome smart app.

### How to use:
Step 0. Open application in your browser. <br>
Step 1. Register or login in application. <br>
Step 2. Select your home or create new home, also you can join in the existing home if you can remember home ID and security Key. <br>
Step 3. Add your smart devices from this application or from Samsung SmartThings App. <br>
Step 4. Now you can see your devices in devices list, also you can control your devices and view statistic graph for devices exploitation.<br>
