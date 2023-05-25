const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const database = require("./database/database");
const Criminals = require("./database/Criminals");

//Database
database
        .authenticate()
        .then(() => {
            console.log("Connection made successfully");
        })
        .catch((errorMsg) => {
            console.log(errorMsg);
        })

//Body Parser
app.use(bodyParser.urlencoded( { extended:true } ));
app.use(bodyParser.json());

//Views
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Routes
app.get("/", (req, res) => {
    Criminals.findAll( { raw: true, order:[
        ['id', 'DESC']
    ]}).then(criminals => {
        res.render("index", {
            criminals: criminals
        });
    })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/insertnew", (req, res) => {
    let name = req.body.name;
    let age = req.body.age;
    let description = req.body.description;
    let weakness = req.body.weakness;
    let risklevel = req.body.risklevel;
    let arrested = req.body.arrested;

    Criminals.create({
        name: name,
        age: age,
        description: description,
        weakness: weakness,
        risklevel:risklevel,
        arrested: arrested
    }).then(() => {
        console.log("New registration done successfully!")
        res.redirect("/");
    }).catch((errorMsg) => {
        console.log(errorMsg)
        res.redirect("/register");
    })
})

app.get("/criminalprofile/:id", (req, res) => {
    let criminal_id = req.params.id
    Criminals.findOne({
        where: {id: criminal_id}
    }).then(criminal => {
        if(criminal != undefined) {
            res.render("criminalprofile", {
                criminal: criminal
            })
        } else {
            res.redirect("/");
        }
    })
})

app.post("/searchone", (req, res) => {
    let searchOne = req.body.searchOne

    Criminals.findOne({
        where: {name: searchOne}
    }).then(searchOne => {
        if(searchOne != undefined) {
            res.render("searchOne", {
                searchOne: searchOne
            })
        } else {
            res.redirect("/")
        }
    })
})

app.get("/update/:id", (req, res) => {
    let criminal_id = req.params.id
    Criminals.findOne({
        where: {id: criminal_id}
    }).then(criminal => {
        if(criminal != undefined) {
            res.render("update", {
                criminal: criminal
            })
        } else {
            res.redirect("/");
        }
    })
})

app.post("/newupdate", (req, res) => {
    let id = req.body.criminal_id;
    let name = req.body.name;
    let age = req.body.age;
    let description = req.body.description;
    let weakness = req.body.weakness;
    let risklevel = req.body.risklevel;
    let arrested = req.body.arrested;

    Criminals.update({
        name: name,
        age: age,
        description: description,
        weakness: weakness,
        risklevel: risklevel,
        arrested: arrested
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/")
    }).catch((errorMsg) => {
        console.log(errorMsg)
        res.redirect("/")
    })
})

//App server
app.listen(4040, () => {
    console.log("Access your batcomputer in http://localhost:4040")
})