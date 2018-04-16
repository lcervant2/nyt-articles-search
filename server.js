const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// import routes
const routes = require("./routes");

// create express app and determine port
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3001;

// setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// add routes
app.use(routes);

// setup mongoose promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nytreact')
  .then(() => console.log('==> Successfully connected to the database'))
  .catch((err) => console.error(err));

// setup socket.io notification server
const io = require("socket.io")(server);

io.on("connection", (client) => {
  client.on("article_saved", article => {
    io.emit('article_saved', article);
  })
});

// start the server
server.listen(PORT);
console.log(`==> API server now listening on PORT ${PORT}`);