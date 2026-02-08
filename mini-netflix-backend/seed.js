require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs');
const Movie = require('./netflix_models/movie');
const { argv0 } = require('process');

const API_KEY = process.env.POSTER_API_KEY;
const URI = process.env.MONGO_URI1;
const folderPath = 'D:/Movies';

const seedMovies = async () => {
    try {
        await mongoose.connect(URI);
        console.log('✅ Connected to Cloud Database');

        await Movie.deleteMany({});
        console.log('🧹 Old data cleared.');

        const items = fs.readdirSync(folderPath);

        const movieFolders = items.filter(item => {
            const fullPath = folderPath + "/" + item;
            return fs.statSync(fullPath).isDirectory();
        });

        console.log(`📂 Found ${movieFolders.length} movie folders.`);

        const moviesToSave = [];

        for (const folderName of movieFolders) {
            const response = await fetch(`http://www.omdbapi.com/?t=${folderName}&apikey=${API_KEY}`)
            const data = await response.json()

            const poster = (data.Poster && data.Poster !== 'N/A') ? data.Poster : 'N/A';

            const movieData = {
                title: folderName,
                posterImage: poster,
                folderName: folderName,
                size: 0
            }

            moviesToSave.push(movieData);
        }

        if (moviesToSave.length > 0) {
            await Movie.insertMany(moviesToSave);
            console.log(`🚀 Successfully uploaded ${moviesToSave.length} movies to Atlas!`);
        } else {
            console.log('⚠️ No movie folders found.');
        }

        mongoose.connection.close();
        console.log('👋 Connection closed.');

    } catch (err) {
        console.log('❌ Error:', err);
    }
};
seedMovies();
