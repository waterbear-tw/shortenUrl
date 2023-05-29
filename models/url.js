const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  urlDomainName: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Url", urlSchema);
