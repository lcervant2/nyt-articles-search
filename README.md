# NYT Article Search

This app uses an Express/Node.js backend and a React.js frontend and allows users to search for articles using the New York Times API.

It uses MongoDB to save articles and Socket.io to notify running clients whenever a new article is saved.

## Running the app locally

1. Make sure you have a local instance of MongoDB running. This app will use the database "nytreact".

2. Install the server and client dependencies by running the following commands:

```
yarn install
cd client
yarn install
cd ..
```

3. Once the dependencies are installed you can start the servers by running

```
yarn start
```

The app should now be running locally at <http://localhost:3000>.

## Deployment (Heroku)

1. Create a new Heroku app by running

```
heroku create
```

2. Provision the free MongoDB addon

```
heroku addons:create mongolab
```

3. Build the React app for deployment by running

```
yarn build
```

4. Add and commit all changes to git

5. Push to Heroku by running

```
git push heroku master
```

This should complete the deployment to Heroku.