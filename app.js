const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
const sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');





require('cross-fetch/polyfill');

const hostname = '127.0.0.1';
const port = 3000;
const API_KEY = "8d33e1b0-b77e-11e8-bf0e-e9322ccde4db";

// Initialize Express
const app = express();
app.use(express.static('static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.text())

//open database for comments
let db = new sqlite3.Database('lab4database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});



// Options for express-vue
const vueOptions = {
  head: {
    title: 'Harvard Art Museums',
    metas: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
    ],
    styles: [
      {
        style: '/css/styles.css'
      },
      {
        style: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      }
    ]
  },
  rootPath: path.join(__dirname, '/views')
};


// Initialize express-vue
const expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);

// List galleries
app.get('/', (req, res) => {

  const url = `https://api.harvardartmuseums.org/gallery?size=100&apikey=${API_KEY}`;
  //calls API for all galleries
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let galleries = data.records;
      res.renderVue('index.vue', {galleries});
    });
});




// List objects
app.get('/gallery/:gallery_id', (req, res) => {
  const objURL = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&gallery=${req.params.gallery_id}`;
  //calls API for individual gallery
  fetch(objURL)
    .then(response => response.json())
    .then(data => {
      let objects= data.records;
      res.renderVue('object.vue', {objects});
    });
});

// Show object
app.get('/object/:objectnumber', (req, res) => {
  let todos = ["one", "two", "three"];
  const singleURL = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&objectnumber=${req.params.objectnumber}`;
  //calls API for individual object
  fetch(singleURL)
    .then(response => response.json())
    .then(data => {
      let singles = data.records[0];


      res.renderVue('singles.vue', {singles, todos});
    });
});

// Comment on object
let allcomments = [];



app.post('/object/:objectnumber/comment', (req, res) => {

  console.log(req.body.todo);
  console.log("116");

  if(allcomments[req.params.objectnumber]) {
    allcomments[req.params.objectnumber].push(req.body.todo);
  }
  else {
    allcomments[req.params.objectnumber] = [];
    allcomments[req.params.objectnumber].push(req.body.todo);
  }
  console.log(allcomments);




  /*db.run(`INSERT INTO CommentsTable (comment, username, objectnumber) VALUES(?,?,?)`,
  [`${comment}`, `${username}`, `${req.params.objectnumber}`], function(err) {
    if (err) {
        return console.log(err.message);
    }
  }); */
  db.run(`INSERT INTO CommentsTable (comment, objectnumber) VALUES(?,?)`,
    [`${req.body.todo}`, `${req.params.objectnumber}`], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

  res.redirect(`/object/${req.params.objectnumber}`);
});


/*  let length= db.get(`SELECT COUNT (comment) FROM CommentsTable`);
                    for (i = 0; i < length; i++) {
                        this.todos.push(`SELECT comment FROM CommentsTable WHERE id=i`);
                    }*/

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});


