var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Employees = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    level: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

//Export model
module.exports = mongoose.model("Employee", Employees);
