// Dependencies
// =============================================================
const express = require("express");
const exphbs = require('express-handlebars');
const db = require('./models')
const routes = require('./controllers/user-controller.js')


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Routes
// =============================================================
app.use(routes)

// Starts the server to begin listening
// =============================================================
db.sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
      });

})


