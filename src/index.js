const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

// Initializations
const app = express();
require('./lib/passport');//para que la aplicacion se entere de la autenticacion que estamos usando

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'linksappmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());//manejo de mensajes con connect-flash (success/error)
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//para indicar que se aceptaran parametros de formularios, solo campos sencillos (no imagenes)
app.use(express.json());
app.use(passport.initialize());//para inicializar el manejo de sesiones
app.use(passport.session());//para indicar donde va a guardar los datos de session/logueo

// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    next();
})

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

// Public
app.use(express.static(path.join(__dirname, 'public')));


// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})

