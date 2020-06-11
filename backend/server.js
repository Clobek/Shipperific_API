// DEPENDENCIES

require("custom-env").env(true);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const unirest = require('unirest');
// mongoose.Promise = global.Promise;
// const cors = require('cors')

// GLOBALS

const PORT = process.env.PORT || 3000;
const packageController = require("./controllers/packages");
const db = mongoose.connection;
const MONGODB_URI =
  process.env.MONGODB_URL || "mongodb://localhost:27017/packages";

/****
 * Mongoose
 **/
const mongoose =        require("mongoose");
const mongoURI =        "mongodb://localhost: 27017/products";
const db =              mongoose.connection;

// process.on('unhandledRejection', (reason, promise) => {
//     console.log('Unhandled Rejection at:', promise, 'reason:', reason);
//     // Application specific logging, throwing an error, or other logic here
//   });

// MIDDLEWARE
// app.use(cors())
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use("/packages", packageController);

// var req = unirest("POST", "https://order-tracking.p.rapidapi.com/trackings/realtime");

// req.headers({
// 	"x-rapidapi-host": "order-tracking.p.rapidapi.com",
// 	"x-rapidapi-key": "71db88e15amshcf09b459b324355p146d98jsn535e15d76413",
// 	"content-type": "application/json",
// 	"accept": "application/json",
// 	"useQueryString": true
// });

// req.type("json");
// req.send({
// 	"tracking_number": "1Z74A08E0317341984",
// 	"carrier_code": "ups"
// });

// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });

/****
 * Connect
 **/
mongoose.connect(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
  });
  db.once("open", () => show("db open on", mongoURI));

// SERVER LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
