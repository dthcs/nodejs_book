const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// app.use((req, res, next) => {
//     console.log("execute all requests");
//     next();
// });

// app.get('/', (req, res, next) => {
//     console.log('only execute GET / request');
//     next();
// }, (req, res) => {
//     throw new Error('Go to middlewares for error handling')
// });

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});


// app.get('/', (req, res) => {
//     // res.send('Hello, Express');
//     res.sendFile(path.join(__dirname, '/index.html'));
// });

app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'port waiting');
});