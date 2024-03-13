import express from 'express';
import config from '.config';

const app = express();
app.use(express.json());

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));