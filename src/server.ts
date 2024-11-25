import express from 'express';
import { json } from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());

// Простейший маршрут
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
