# Search-Geolocation

Search-geolocation is an app that fetch the list of nearby locations to the provided "latitude" and "longitude"

React based frontend with TSX, SASS. Backend made with NodeJS, Express, Typescript and PostgreSQL.


## Application
### Error Messges:
<img src="https://github.com/sonia0409/StayFit/blob/master/docs/login.png?raw=true" width="300" height="400" />

### Data:

<img src="https://github.com/sonia0409/StayFit/blob/master/docs/dashboard.gif?raw=true" width="300" height="400" />



___
## Getting Started


Clone the search-geolocation repository and run application locally

save that DB connection variables to the .env file locally

.env example
PORT = ""
DB_HOST = "" 
DB_USER = ""
DB_PASSWORD = "" 
DB_DATABASE = ""
DB_PORT = ""

## Setting up db
to migrate the data from csv file to the table in psql

npm db:reset 

___

## Using the application locally

1. Fork/clone the [search-geolocation Repo](https://github.com/sonia0409/) repo to your local device.

```js
git clone git@github.com:sonia0409/
```

2. Setting up and running server/backend:
```js
cd server-side
npm install

# Start server
npm start run dev
```

3. Setting up and running client/frontend:
```js
cd client-side
npm install

# Start client
npm start
```

4. Go to <http://localhost:3000/> in your browser.

___
## Dependencies

Frontend:
- React
- React-Router-Dom/React-Dom
- Axios
- SASS

Backend:
- Express
- Node
- body-parser
- cors