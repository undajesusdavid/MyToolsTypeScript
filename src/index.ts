import express from 'express';
import { RouterApi } from './infraestructure/entrada/express/routes/index.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/api", await RouterApi())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});








