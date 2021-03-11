  
'use strict';

module.exports = (app, db) => {
  // GET all blog
  app.get('/blog', (req, res) => {
    db.blog.findAll()
      .then(blog => {
        res.json(blog);
      });
  });

  // GET one blog by id
  app.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    db.blog.find({
      where: { id: id}
    })
      .then(blog => {
        res.json(blog);
      });
  });

  // POST single blog
  app.post('/blog', (req, res) => {
    const text = req.body.text;
    db.blog.create({
      text: text,
    })
      .then(newBlog => {
      res.json(newBlog);
    });
  });

  // PATCH single blog
  app.put('/blog/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    db.blog.find({
      where: { id: id }
    })
      .then(blog => {
        return blog.updateAttributes(updates);
      })
      .then(updatedBlog => {
        res.json(updatedBlog);
      });
  });

  app.delete('/blog/:id', (req, res) => {
    const id = req.params.id;
    db.blog.destroy({
      where: { id: id }
    })
      .then(deletedBlog => {
        res.json(deletedBlog);
      });
  });

};