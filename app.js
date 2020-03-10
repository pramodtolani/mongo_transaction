var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const db = require("./db");
db.on("error", err => console.log(err));

var UserModel = require("./models/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", async (req, res) => {
    console.log(new Date().toISOString());

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const opts = { session };
            const user = await new UserModel({
                name: "john",
                email: "john@mailinator.com"
            }).save(opts);
            // .then(async user => {
            //     // if (user && user._id) {
            //     //     throw "test error";
            //     // }
            //     await session.commitTransaction();
            //     session.endSession();
            //     console.log(new Date().toISOString());
            //     res.json(user);
            // })
            // .catch(async err => {
            //     await session.abortTransaction();
            //     session.endSession();
            //     console.log(new Date().toISOString());
            //     res.json(err);
            // });

            if (user && user._id) {
                throw "test error";
            }

            await session.commitTransaction();
            session.endSession();

            console.log(new Date().toISOString());

            res.json(user);
        } catch (error) {
            console.log(error);
            // If an error occurred, abort the whole transaction and
            // undo any changes that might have happened
            await session.abortTransaction();
            session.endSession();
            console.log(new Date().toISOString());

            res.json(error);
            // throw error; // Rethrow so calling function sees error
        }
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
