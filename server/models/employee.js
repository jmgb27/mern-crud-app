var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Employees = new Schema({
    name: {
        type: String,
        required: [true, "Name Required"],
    },
    position: { type: String, required: [true, "Position Required"] },
    level: { type: String, required: [true, "Level Required"] },
    date: { type: Date, default: Date.now },
});

//Export model
module.exports = mongoose.model("Employee", Employees);
