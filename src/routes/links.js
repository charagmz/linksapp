const express = require('express');
const router = express.Router();

const pool = require('../database');
const Link = require('../models/Link');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, (req, res) => {
    Link.add(pool, req.user.id, req.body, function (err) {
        req.flash('success', 'Link saved successfully');//message name and content
        res.redirect('/links');
    });
});

router.get('/', isLoggedIn, (req, res) => {
    Link.list(pool, req.user.id, function (err, links) {
        res.render('links/list', {links });
    });
    //res.send('listas aqui');
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    //console.log(req.params.id);
    const { id } = req.params;
    Link.delete(pool, id, function(err) {
        req.flash('success', 'Link removed successfully');
        res.redirect('/links');
        //res.render('links/list', {links });
    });
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    Link.getById(pool, id, function (err, links) {
        res.render('links/edit', {link: links[0] });
    });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    Link.edit(pool, id, req.body, function (err) {
        req.flash('success', 'Link updated successfully');
        res.redirect('/links');
    });
});

module.exports = router;