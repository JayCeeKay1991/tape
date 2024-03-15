import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', (req: Request, res: Response) => {
  res.send('Haaaayy');
});
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server listening on port ${process.env.PORT || 4000}`)
});
