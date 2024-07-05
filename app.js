const express = require('express');
const cookiParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limiter');
const cors = require('cors');

require('dotenv').config();

// Mongo DB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
// Middleware
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 10000,
      max: 20,
    })
  );
}
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiParser());

app.use('/posts', require('./routes/post'));
app.use('/posts', require('./routes/comment'));
app.use('/users', require('./routes/user'));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
