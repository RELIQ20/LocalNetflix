const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const folderpath = 'D:/Movies'

router.get('/', (req, res) => {
    fs.readdir(folderpath, (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Could not retrieve catalog');
        }
        const movielist = files.filter(movie => !movie.includes('.'));
        res.json(movielist);
    });
});

module.exports = router;

