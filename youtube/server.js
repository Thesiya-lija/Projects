// // server.js

// import express from 'express';
// import ytdl from 'ytdl-core';

// const app = express();

// app.get('/download', async (req, res) => {
//   const videoId = req.query.videoId;

//   try {
//     // Validate video ID
//     if (!videoId) {
//       return res.status(400).send('Video ID is required');
//     }

//     const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

//     // Check if the video is valid
//     const isValidVideo = await ytdl.validateURL(videoURL);
//     if (!isValidVideo) {
//       return res.status(400).send('Invalid video ID');
//     }

//     // Get video info (optional, but useful for debugging)
//     const videoInfo = await ytdl.getInfo(videoURL);
//     console.log('Downloading:', videoInfo.videoDetails.title);

//     // Set response headers
//     res.header('Content-Disposition', `attachment; filename="${videoId}.mp4"`);
//     res.header('Content-Type', 'video/mp4');

//     // Stream video using ytdl-core
//     ytdl(videoURL, {
//       format: 'mp4',
//       quality: 'highest', // or 'lowest' for smaller size
//     }).pipe(res);
//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).send('Error downloading video');
//   }
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
