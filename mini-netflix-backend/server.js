require('dotenv').config();
const express = require('express');
const cors = require('cors')
const path = require('path');
// const catalogRoute = require('./catalog');
const app = express();
app.use(cors());
app.use(express.json());

const fs = require('fs');
const folderPath = 'D:/Movies';

const mongoose = require('mongoose');
const Movie = require('./netflix_models/movie');


const URI = process.env.MONGO_URI1;
const PORT = process.env.PORT;

// app.use('/api/catalog', catalogRoute);

mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB cloud'))
    .catch((err) => console.log("MongoDB cloud error:", err))

app.get('/movies', async (req, res) => {
    try {
        const movie = await Movie.find();
        res.json(movie);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

app.get('/', (req, res) => {
    res.send("Welcome to mini-netflix");
    console.log("A user opened the site")
});

app.get('/files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Could not retrieve movies');
        }
        res.json(files)
    })
})

app.get('/files/:folderName', (req, res) => {
    const folderName = req.params.folderName;
    const subFolderPath = path.join(folderPath, folderName);

    // check if the folder exists first
    if (!fs.existsSync(subFolderPath)) {
        return res.status(404).send('Folder not found');
    }

    fs.readdir(subFolderPath, (err, files) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Could not open folder');
        }
        res.json(files);
    });
});

app.get('/video/:filename', (req, res) => {
    const fileName = req.params.filename;

    let filePath = folderPath + "/" + fileName;

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not Found!');
    }

    if (fs.statSync(filePath).isDirectory()) {
        const filesInside = fs.readdirSync(filePath);
        const actualVideo = filesInside.find(file => file.endsWith('.mp4') || file.endsWith('.mkv'));

        if (actualVideo) {
            filePath = filePath + "/" + actualVideo;
        }
    }

    const videoSize = fs.statSync(filePath).size;
    const range = req.headers.range || "bytes=0-";

    if (!range) {
        return res.status(400).send("Requires Range header");
    }

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const mimeType = filePath.endsWith('.mkv') ? 'video/x-matroska' : 'video/mp4';

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": mimeType,
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(filePath, { start, end });

    videoStream.pipe(res);
});

app.listen(PORT, () => console.log('The server is now starting!', PORT))
