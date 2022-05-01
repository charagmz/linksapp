const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');


router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});

/*
router.post('/signup', (req, res) => {
    //console.log(req.body)
    passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });//toma el nombre de la autenticacion que hemos creado 'local.signup'
    res.send('req signup');
});
*/
 
//Otra forma de hacer lo anterior
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

//se escribe de esta form para el manejo de validaciones
router.post('/signin', isNotLoggedIn, (req, res, next) => { 
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res, next) => {
    res.render('profile');
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();//al inicializar passport agrega al objeto request el metodo logOut (ademas de otros)  
    res.redirect('/signin');
});

module.exports = router;