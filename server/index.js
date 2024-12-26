import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'; 
import router from './routes/index.js'; 
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './socket/index.js';
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST"],
  credentials: true,
}));

const allowedOrigins = ['http://localhost:3000', 'http://localhost:8080'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.get('/', (req, res) => {
  res.json({ message: 'Server running on port ' + PORT });
});

app.post('/api/register', (req, res) => {
  res.send({ message: 'User registered successfully' });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.post('/api/email', (req, res) => {
  try {
    const email = req.body.email;
    res.status(200).json({ message: 'Email processed successfully' });
  } catch (error) {
    console.error('Error processing email:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  
app.post('/api/password', (req, res) => {
  try {
    const password = req.body.email;
    res.status(200).json({ message: 'paswword processed successfully' });
  } catch (error) {
    console.error('Error processing password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


