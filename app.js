const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
//const sqlite3 = require('sqlite3');
var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();




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

// Comment on object
let allcomments = [];
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




  const singleURL = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&objectnumber=${req.params.objectnumber}`;
  //calls API for individual object
  fetch(singleURL)
    .then(response => response.json())
    .then(data => {
      let singles = data.records[0];
      let todos = allcomments[req.params.objectnumber];
      if (! todos) {
        todos=[];
      }
      console.log("109 todos");
      console.log(todos);

      //selects comments for this object from SQL table
      db.all(`SELECT comment FROM CommentsTable WHERE objectnumber = ?`, [`${req.params.objectnumber}`], (err, rows) => {

          console.log("116 rows");
          console.log(rows);
          // pushes comments from each row onto todos array
          rows.forEach((row => {
            if (!(todos.includes(row.comment))) {
              todos.push(row.comment);

            }

          }))


        }
      );
      console.log("129 todos");
      console.log(todos);
      //render singles page
      res.renderVue('singles.vue', {singles, todos});
    }); });






app.post('/object/:objectnumber/comment', (req, res) => {
  console.log("140 req.body.todo");
  console.log(req.body.todo);

// push new comment onto "allcomments" array
  if(allcomments[req.params.objectnumber]) {
    allcomments[req.params.objectnumber].push(req.body.todo);
  }
  else {
    allcomments[req.params.objectnumber] = [];
    allcomments[req.params.objectnumber].push(req.body.todo);
  }
  console.log("151 allcomments")
  console.log(allcomments);

  //insert new comment into SQL table
  db.run(`INSERT INTO CommentsTable (comment, objectnumber) VALUES(?,?)`,
    [`${req.body.todo}`, `${req.params.objectnumber}`], function(err) {
      if (err) {
        return console.log(err.message);
      }
    });

  db.all(`SELECT comment FROM CommentsTable WHERE objectnumber = ?`, [`${req.params.objectnumber}`], (err, rows) => {
    if (! allcomments[req.params.objectnumber]) {
      allcomments[req.params.objectnumber] = []
    }
    console.log("116 rows");
    console.log(rows);
    // pushes comments from each row onto todos array
    rows.forEach((row => {
      if (!(allcomments[req.params.objectnumber].includes(row.comment))) {
        allcomments[req.params.objectnumber].push(row.comment);

      }

    }))
  });
  const singleURL = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&objectnumber=${req.params.objectnumber}`;
  //calls API for individual object
  fetch(singleURL)
    .then(response => response.json())
    .then(data => {
      let singles = data.records[0];
      let todos = allcomments[req.params.objectnumber];

      res.redirect(`/object/${req.params.objectnumber}`);
    });
});



// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});

