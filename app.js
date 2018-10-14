const express = require('express');
const expressVue = require('express-vue');
const path = require('path');
require('cross-fetch/polyfill');

const hostname = '127.0.0.1';
const port = 3000;
const API_KEY = "8d33e1b0-b77e-11e8-bf0e-e9322ccde4db";

// Initialize Express
const app = express();
app.use(express.static('static'));


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
  const singleURL = `https://api.harvardartmuseums.org/object?size=100&apikey=${API_KEY}&objectnumber=${req.params.objectnumber}`;
  //calls API for individual object
  fetch(singleURL)
      .then(response => response.json())
      .then(data => {
        let singles = data.records[0];
        console.log("singles")
        console.log(singles);
          res.renderVue('singles.vue', {singles});
      });
});

// Comment on object
app.get('/objects/:object_id/comment', (req, res) => {
  // TODO
});

// Listen on socket
app.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});
