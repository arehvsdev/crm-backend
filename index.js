require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/dbConfig');

const userRoutes = require('./routes/UserRoutes');
connectDB();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    console.log('Server is running');
})

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



