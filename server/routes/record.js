const express = require("express");
var mongoose = require("mongoose");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
// const dbo = require("../db/conn");
var mongoDB = process.env.ATLAS_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = require("../models/employee");

// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async (req, res) => {
    const records = await db.find({});
    // console.log('Response => ', records)
    res.json(records);
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(async (req, res) => {
    const records = await db.findOne({ _id: req.params.id });
    // console.log('Response => ', records)
    res.json(records);
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async (req, res) => {
    let myObj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    console.log(myObj);

    try {
        const response = await db.create(myObj);
        console.log(response);
        res.json(["Success"]);
    } catch (err) {
        if (err.name === "ValidationError") {
            console.error(Object.values(err.errors).map((val) => val.message));
            res.json(Object.values(err.errors).map((val) => val.message));
        } else {
            console.error(err);
        }
    }
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(async (req, res) => {
    console.log(req.body.name);
    const response = await db.updateOne(
        {
            _id: req.params.id,
        },
        {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            },
        }
    );

    console.log(response);

    res.json({ status: "ok" });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete(async (req, res) => {
    const { record } = req.body;
    console.log(record, "/api/delete");

    const response = await db.deleteOne({ _id: req.params.id });

    console.log(response, "/api/delete repsonse");

    res.json({ status: "ok" });
});

module.exports = recordRoutes;
