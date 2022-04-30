const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', async (req, res) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links SET ?', [newLink]);
    //console.log(newLink);
    req.flash('success', 'Link saved successfully');//message name and content
    res.redirect('/links');
});

router.get('/', async (req, res) => {
    const links = await pool.query('SELECT * FROM links');
    //console.log(links);
    //res.send('listas aqui');
    res.render('links/list', {links });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id=?', [id]);
    //console.log(req.params.id);
    req.flash('success', 'Link removed successfully');
    res.redirect('/links');
    //res.render('links/list', {links });
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id=?', [id]);
    res.render('links/edit', {link: links[0] });
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    //console.log(newLink);
    req.flash('success', 'Link updated successfully');
    res.redirect('/links');
});

module.exports = router;