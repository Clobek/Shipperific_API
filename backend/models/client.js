const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  client: String,
  shopping_cart: Array,
});

module.exports = model("Client", clientSchema);
