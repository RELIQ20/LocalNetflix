require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Movie = require("./netflix_models/movie");

const API_KEY = process.env.POSTER_API_KEY;
const URI = process.env.MONGO_URI1;
const folderPath = "D:/Movies";

const seedMovies = async () => {
    try {
        await mongoose.connect(URI);
        console.log("✅ Connected to Cloud Database");

        await Movie.deleteMany({});
        console.log("🧹 Old data cleared.");

        const items = fs.readdirSync(folderPath);

        const movieFolders = items.filter((item) => {
            const fullPath = folderPath + "/" + item;
            return fs.statSync(fullPath).isDirectory();
        });

        console.log(`📂 Found ${movieFolders.length} movie folders.`);

        const moviesToSave = [];

        for (const folderName of movieFolders) {
            // 1. Changed to plot=full
            const response = await fetch(
                `http://www.omdbapi.com/?t=${folderName}&apikey=${API_KEY}&plot=full`,
            );
            const data = await response.json();

            // 2. The High-Res Poster Trick!
            let poster = "N/A";
            if (data.Poster && data.Poster !== "N/A") {
                poster = data.Poster.replace("SX300", "SX1000");
            }

            // 3. Grab the full plot (with a fallback just in case)
            const moviePlot =
                data.Plot && data.Plot !== "N/A" ? data.Plot : "No synopsis available.";

            // 4. Bonus: Use OMDB's clean title instead of the messy folder name!
            const cleanTitle =
                data.Title && data.Title !== "N/A" ? data.Title : folderName;

            const movieData = {
                title: cleanTitle,
                posterImage: poster,
                folderName: folderName,
                plot: moviePlot, // Add the new plot property
                size: 0,
            };

            moviesToSave.push(movieData);
        }

        if (moviesToSave.length > 0) {
            await Movie.insertMany(moviesToSave);
            console.log(
                `🚀 Successfully uploaded ${moviesToSave.length} movies to Atlas!`,
            );
        } else {
            console.log("⚠️ No movie folders found.");
        }

        mongoose.connection.close();
        console.log("👋 Connection closed.");
    } catch (err) {
        console.log("❌ Error:", err);
    }
};

seedMovies();
