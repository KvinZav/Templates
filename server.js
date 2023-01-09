require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const { compile } = require('handlebars');
const path = require('path');
const { resolve } = require('path');
const { readFileSync } = require('fs');
const moment = require('moment');

// Mi files
const { sendEmailAWS } = require('./email');

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

app.get('/email', async (_, res ) => {
  const path = resolve('./views/email-publication-back.hbs');
  const fileContent = readFileSync(path, 'utf-8');
  const template = compile(fileContent);

  const body = template({
    layout: false,
    brandName: 'Cupcake Extravaganza',
    businessOwnerName: 'Genea',
    publicationDate: moment().format('LL'),
    publicationTime: moment().format('hh:mm a'),
    publicationName: 'Christmas launch',
    link: 'https://www.google.com',
    imagesUrl: 'http://localhost:3000'
  });

  await sendEmailAWS(body);

  return res.json({ message: 'hello, there' });
});

app.listen(port, () => {
  console.log('RESULT===>', `PORT enabled: ${port}`);
});