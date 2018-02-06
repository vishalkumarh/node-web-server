const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('View engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n',(err) =>{
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screenIt', (text) =>{
  return text.toUpperCase()
});

app.get('/',(req, res) =>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});
// /bad = send back json with errorMessage
app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () =>{
  console.log('Server is listning 3000');
});
