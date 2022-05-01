const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/signup', (req, res) => {
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
router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/profile', (req, res) => {
    res.send('your profile');
});

module.exports = router;