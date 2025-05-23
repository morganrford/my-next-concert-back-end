const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors')

const concertRouter = require('./controllers/concerts')
const bandRouter = require('./controllers/bands')
const jwtRouter = require('./controllers/jwt');
const authRouter = require('./controllers/auth');


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(logger('dev'));

//Routes

app.use('/concerts', concertRouter)
app.use('/band', bandRouter)
app.use('/auth', authRouter);
app.use('/jwt', jwtRouter);

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT= 5000;
app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});

