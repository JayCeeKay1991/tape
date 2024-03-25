import express from 'express';
import cors from 'cors';
import config from './config/config';
import router from './router';
const PORT = config.port

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});

export = app;