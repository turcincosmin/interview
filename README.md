# Interview

A distributed worker made with node js app

### Step 1: Install node modules using npm or yarn

`npm install`

or

`yarn`

### Step 2: Start mongoDB

Set up the envriment for the database in `.env` file, with following example fields:

```
DATABASE_HOST=localhost:27017
DATABASE_NAME=workers
```

#### And then start it:

Via docker: `docker-compose up -d`

Or install [Mongo](https://docs.mongodb.com/guides/server/install/) directly on your machine

### Step 3: Run migration

`npm run migrate up`

or

`yarn migrate up`

#### (For demo purpose we can start the aplication with multiple workers) from `ecosystem.config.js` file:

```javascript
{
  ...,
  instances: 4 // or more
}
```

### Step 4: Start the app

`npm run start`

or

`yarn start`

## Usage

### To add a new request:

```
curl --data "url=http://test.test.com" http://localhost:3000/add-request

```

or use postman
(no time for client interface :) )

### To check requets status check database or logs

(Robo 3T is a quick mongo client to check the requests)

#### if a client interface it's needed to see and add requets, please contact me, I ll need 2 more hours for that.
