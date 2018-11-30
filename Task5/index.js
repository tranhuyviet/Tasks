'use strict';
require('dotenv').config();
const express = require('express');
const db = require('./modules/database');
const resize = require('./modules/resize');
const exif = require('./modules/exif');
const fs = require('fs');
const bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer({
  dest: 'public/uploads/'
});

const app = express();

//Use ejs
app.set('view engine', 'ejs');
app.set('views', 'public');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json());

const connection = db.connect();

const cb = (result, res) => {
  ////console.log(result);
  res.send(result);
};

app.use(express.static('public'));

// respond to post and save file
app.post('/upload', upload.single('mediafile'), (req, res, next) => {
  next();
});

// create thumbnail
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 300,
    './public/thumbs/' + req.file.filename + '_thumb', next);
});

// create medium image
app.use('/upload', (req, res, next) => {
  resize.doResize(req.file.path, 640,
    './public/medium/' + req.file.filename + '_medium', next);
});

// get coordinates
app.use('/upload', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  }).catch(() => {
    console.log('No coordinates');
    req.coordinates = {};
    next();
  });
});

// insert to database
app.use('/upload', (req, res, next) => {
  console.log('insert is here');
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename + '_thumb',
    req.file.filename + '_medium',
    req.file.filename,
    req.coordinates,
  ];
  db.insert(data, connection, next);
});

// get updated data form database and send to client
app.use('/upload', (req, res) => {
  db.select(connection, cb, res);
});

app.get('/images', (req, res) => {
  db.select(connection, cb, res);
});

app.use('/images', (req, res, next) => {
  console.log('update is here');
  ////console.log(req.body);
  db.update(req.body, connection, next);
});

app.patch('/images', (req, res) => {
  console.log('body', req.body);
  res.send(JSON.stringify(req.body));
});

app.get('/delete', (req, res, next) => {
  db.select(connection, cb, res);
});

app.use('/delete', (req, res, next) => {
  console.log('delete body', req.body);
  const id = [];
  id.push(req.body[0]);

  const thumbnail = req.body[1];
  const image = req.body[2];
  const original = req.body[3];
  fs.unlink('./public/uploads/' + original, err => {
    if (err) console.log(err);
  });
  fs.unlink('./public/thumbs/' + thumbnail, err => {
    if (err) console.log(err);
  });
  fs.unlink('./public/medium/' + image, err => {
    if (err) console.log(err);
  });
 

  db.delete(id, connection, next);
});

app.patch('/delete', (req, res) => {
  console.log('body', req.body);
  res.send(JSON.stringify(req.body));
});

app.get('/show', (req,res,next) =>{
  res.render('show',{
    pageTitle:'Show page'
  })
})

app.get('/show',(req,res,next) =>{
  
  const data = db.selectCate(connection, cb, res)
/*   res.render('show',{
    pageTitle: "Show page",
    data: req.body
  }); */
  //console.log('aaa',dt);
})



/* app.patch('/show', (req, res) => {
  console.log('body', req.body);
  //res.send(JSON.stringify(req.body));

}); */



app.listen(3000);