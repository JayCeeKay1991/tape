import express from 'express';

const app = express();
app.use(express.json());

app.listen(process.env.PORT || 4000, (req, res) => {
  console.log(`Server listening on port ${process.env.PORT || 4000}`);
  res.send('Hello whatever')

});