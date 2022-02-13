import express from 'express';
import MainRouter from './routes';
import path from 'path';

const app = express();
const PORT = 8000;

app.use(express.json())
app.use('/thumbnails', express.static(path.resolve(__dirname, '..', 'assets', 'thumbnails')))
app.use(express.urlencoded({ extended: true }))
app.use(MainRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});