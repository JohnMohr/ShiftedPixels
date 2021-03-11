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
	const empty = {}
  const emptyArray = [];
  //API call to backend to pull up blog posts
  db.Blog.findAll({attributes: ["id","text"]}).then(blogposts => {
    console.log(blogposts);
    for (let index = 0; index < blogposts.length; index++) {
      emptyArray.push(blogposts[index].dataValues)
    }
    empty.blogtext = emptyArray;
    res.render("local", empty);
  }).catch(err => console.log(err))

  //KOBE
  
})
router.get("/user",function(req,res){
	res.render("user")
})
router.get("/settings",function(req,res){
	res.render("settings")
});

// GET all blog
router.get('/blog', (req, res) => {
  // res.json(db)
  db.Blog.findAll()
    .then(blog => {
      res.json(blog);
    });
});

// GET one blog by id
router.get('/blog/:id', (req, res) => {
  const id = req.params.id;
  db.Blog.find({
    where: { id: id}
  })
    .then(blog => {
      res.json(blog);
    });
});

// POST single blog
router.post('/blog', (req, res) => {
  const text = req.body.text;
  db.Blog.create({
    text: text,
  })
    .then(newBlog => {
    res.json(newBlog);
  });
});

// PATCH single blog
router.put('/blog/:id', (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  db.Blog.find({
    where: { id: id }
  })
    .then(blog => {
      return blog.updateAttributes(updates);
    })
    .then(updatedBlog => {
      res.json(updatedBlog);
    });
});

router.delete('/blog/:id', (req, res) => {
  const id = req.params.id;
  db.Blog.destroy({
    where: { id: id }
  })
    .then(deletedBlog => {
      res.json(deletedBlog);
    });
});


module.exports = router;