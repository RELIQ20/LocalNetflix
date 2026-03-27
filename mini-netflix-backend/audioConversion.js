const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const folderPath = "D:/Movies";

const fixAudio = (inputPath, outputPath) => {
    return new Promise((resolve, reject) => {
        console.log(`\n🔊 Fixing audio for: ${path.basename(inputPath)}`);

        ffmpeg(inputPath)
            .videoCodec("copy")
            .audioCodec("aac")
            .save(outputPath)
            .on("progress", (progress) => {
                if (progress.percent) {
                    process.stdout.write(
                        `\r⚡ Processing: ${Math.floor(progress.percent)}%`,
                    );
                }
            })
            .on("end", () => {
                console.log(`\n✅ Audio fixed! Created: ${path.basename(outputPath)}`);
                resolve();
            })
            .on("error", (err) => {
                console.error(`\n❌ Error converting:`, err.message);
                reject(err);
            });
    });
};

const runAudioFix = async () => {
    try {
        const folders = fs.readdirSync(folderPath);

        for (const folder of folders) {
            const subFolderPath = path.join(folderPath, folder);

            if (fs.statSync(subFolderPath).isDirectory()) {
                const files = fs.readdirSync(subFolderPath);

                const mkvFile = files.find((file) => file.endsWith(".mkv"));

                if (mkvFile) {
                    const inputPath = path.join(subFolderPath, mkvFile);
                    const newMp4Name = mkvFile.replace(".mkv", ".mp4");
                    const outputPath = path.join(subFolderPath, newMp4Name);

                    if (!fs.existsSync(outputPath)) {
                        await fixAudio(inputPath, outputPath);
                    } else {
                        console.log(`⏭️ Skipping ${folder}: MP4 already exists.`);
                    }
                }
            }
        }
        console.log(
            "\n🎉 All done! Your videos should now have perfect audio in the browser.",
        );
    } catch (error) {
        console.error("Script failed:", error);
    }
};

runAudioFix();
