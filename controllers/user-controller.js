const express = require('express')
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
    console.log(req.body)
    db.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json(err);
    })
})
router.post("/login", (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userData => {
        if (!userData) {
            req.session.destroy();
            res.status(404).send("no such user")
        } else {
            if (bcrypt.compareSync(req.body.password, userData.password)) {
                req.session.user = {
                    id: userData.id,
                    username: userData.username
                }
                res.json(userData);
            } else {
                req.session.destroy();
                res.status(401).send("wrong password bro")
            }
        }
    })
})

router.get("/readsessions", (req, res) => {
    res.json(req.session)
})

router.get("/secretclub", (req, res) => {
    if (req.session.user) {
        res.send(`welcome to the club, ${req.session.user.username}!`)
    } else {
        res.status(401).send("login first you knucklehead")
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})
//landing page
router.get("/",function(req,res){
	res.render("index")
})
router.get("/signup",function(req,res){
	res.render("signup")
})
router.get("/community",function(req,res){
	res.render("community")
})
router.get("/local",function(req,res){
	res.render("local")
})
router.get("/user",function(req,res){
	res.render("user")
})
router.get("/settings",function(req,res){
	res.render("settings")
})


module.exports = router;