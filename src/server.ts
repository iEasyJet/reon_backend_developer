import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import singleRouter from './routes/singleRouter';
dotenv.config();

const { PORT, MONGO_SERVER } = process.env;

/* ------------------------------------------------------------------- */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!MONGO_SERVER) {
  throw new Error('MONGO_SERVER environment variable is not defined.');
}

mongoose
  .connect(MONGO_SERVER as string)
  .then(() => {
    console.log(`Mongoose started ${MONGO_SERVER}`);
  })
  .catch((err: Error) => {
    if (err instanceof mongoose.Error) {
      console.error('Connection to MongoDB failed:', err.message);
    } else {
      console.error('An unexpected error occurred:', err.message);
    }
    process.exit(1);
  });

app.use('/', singleRouter);

app.listen(PORT ? PORT : 3000, () => {
  console.log(`App listening on port ${PORT ?? 3000}`);
});
