require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;
const exphbs = hbs.create({
  layoutsDir: false,
  extname: '.hbs',
});

app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.render('email-publication', {
    layout: false,
    brandName: 'Cupcake Extravaganza',
    businessOwnerName: 'Genea',
    publicationDateTime: {
      date: moment().format('LL'),
      hour: moment().format('hh:mm a'),
    },
    publicationName: 'Christmas launch',
    link: 'https://www.google.com',
    imagesUrl: 'http://localhost:3000'
  });
});

app.listen(port, () => {
  console.log('RESULT===>', `PORT enabled: ${port}`);
});