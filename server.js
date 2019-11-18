var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var db = require("./models");
var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/test1";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.get("/load-data", function (req, res) {
    // db.movie.find({})
    //     .then(function(dbMovie) {
    //         res.json(dbMovie);
    //     })
    //     .catch(function(err) {
    //         res.json(err);
    //     });
    mongoose.connection.collections.sessions.drop();
    var data1 = {
        title: "Web Summit",
        description: "Tech Conference",
        speakers: [
            {
                name: "Ev Williams",
                biography: "Founder & CEO of Medium",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/82329b5b6cd0fa8351eecff4180b0bc0866fc3e7.png?1535534731",
                phoneNumber: "16476406630",
                email: "test1@sample.com"
            },
            {
                name: "Timbaland",
                biography: "Producer & Artist at Mosley Music Group",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/83338b04b2bfc93c59b7a5aaabe369023c542a08.png?1554975020",
                phoneNumber: "16476406630",
                email: "test2@sample.com"
            },
            {
                name: "Palmer Luckey",
                biography: "Founder at Oculus VR and Anduril Industries",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/31667f12a5cbc2957943e01e7dd5ec014cfb4ab5.png?1555685225",
                phoneNumber: "16476406630",
                email: "test3@sample.com"
            }
        ]
    };
    var data2 = {
        title: "Collision",
        description: "fastest-growing tech conference in North America",
        speakers: [
            {
                name: "Mona Siddiqui",
                biography: "CDO at U.S. Department of Health and Human Services",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/5293a32c4255af8777c52c13a2541d3fc38544f6.png?1557316206",
                phoneNumber: "16476406630",
                email: "tes41@sample.com"
            },
            {
                name: "Justin Trudeau",
                biography: "Prime Minister at Government of Canada",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/7a39e81597ef24fc09f743ab0144003e189f78d8.png?1557242626",
                phoneNumber: "16476406630",
                email: "test5@sample.com"
            }
        ]
    };
    var data3 = {
        title: "Rise",
        description: "Hong Kong Conference",
        speakers: [
            {
                name: "David Eun",
                biography: "Chief Innovation Officer, Samsung Electronics & President, Samsung NEXT at Samsung",
                photo: "https://s3-eu-west-1.amazonaws.com/avenger.cilabs.net/production/avatars/large/33e87d37766eff00e139013701fd9d41853962fc.png?1563448891",
                phoneNumber: "16476406630",
                email: "tes61@sample.com"
            }
        ]
    }
    db.Session.create(data1)
        .then(function (dbSession) {

            console.log(dbSession);
        })
        .catch(function (err) {
            console.log(err);
        });
    db.Session.create(data2)
        .then(function (dbSession) {
            console.log(dbSession);
        })
        .catch(function (err) {
            console.log(err);
        });
    db.Session.create(data3)
        .then(function (dbSession) {
            console.log(dbSession);
        })
        .catch(function (err) {
            console.log(err);
        });

    res.send("load complete");

});

app.get("/sessions", function (req, res) {
    db.Session.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/sessions/:id", function (req, res) {
    db.Session.findOne({ _id: req.params.id })
        .then(function (dbSession) {
            res.json(dbSession);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/sessions/:id", function(req, res) {
    db.Session.findByIdAndUpdate(req.params.id, {$push:{ratings:req.body.rating}}, {new:true})
        .then(function(dbSession) {
            console.log(dbSession);
            res.json(dbSession);
        })
})

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
