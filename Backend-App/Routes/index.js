import express, { json, urlencoded } from 'express';
import cors from 'cors';
import {login} from './login.js';

const app = express();

const port = 5000
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(json());

app.use(urlencoded({ extended: false }));


// req = request & res = respond
app.post('/login', async (req, res) => {
  let Data = req.body;
  
  const respond = await login(Data.PhoneNumber,Data.Password);

  // console.log(respond);
  res.json(respond);
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);

})