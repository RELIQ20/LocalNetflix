require('dotenv').config()
const mongoose = require('mongoose');
const fs = require('fs');
const Movie = require('./netflix_models/movie');

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

        const moviesToSave = movieFolders.map(folderName => {
            return {
                title: folderName,
                image: folderName,
                folderName: folderName,
                size: 0
            };
        });

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
