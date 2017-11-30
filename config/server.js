/** Importar Módulo do Express */
var express = require('express');

/* Importar Módulo do Consign */
var consign = require('consign');

/* Importar Módulo do body-parser */
var bodyParser = require('body-parser');

/* Importar Módulo do express-validator */
var expressValidator = require('express-validator');

/* Iniciar objeto express */
var app = express();

/* setar as variaveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');


//// configuar os middlewares ///////

/* express.static */
app.use(express.static('./app/public'));

/* body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* express-validator */
app.use(expressValidator());

///// Fim Middlewares /////////////

/* consign auto-loads */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* Exportar configuracao */
module.exports = app;