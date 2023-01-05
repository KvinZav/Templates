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
  helpers: {
    dateFormat(date) {
      return moment(date).format('LL');
    },
    hourFormat(date) {
      return moment(date).format('hh:mm a');
    }
  }
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
    bussinessOwnerName: 'Genea',
    publicationDateTime: '2022-10-20T17:30:00.000Z',
    publicationName: 'Christmas launch',
    publications: 6,
    link: 'https://www.google.com'
  });
});

app.listen(port, () => {
  console.log('RESULT===>', `PORT enabled: ${port}`);
});