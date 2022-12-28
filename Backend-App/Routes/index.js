import express, { json, urlencoded } from 'express';
import cors from 'cors';
import {login} from './LoginSystem/login.js';
import { passwordforget } from './LoginSystem/passwordforget.js';
import { resetPassword } from './LoginSystem/resetpassword.js';
import { createAccount } from './LoginSystem/signup.js';

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
});

app.post('/ForgetPassword', async (req,res) =>{
  let Data = req.body;
  const respond = await passwordforget(Data.PhoneNumber);
  //  console.log(respond);
  res.json(respond);
});

app.patch('/ResetPassword',async (req,res) => {
   let Data = req.body;
   const respond = await resetPassword(Data.PhoneNumber,Data.EncPass);
   res.json(respond);
});

app.post('/SignUp', async (req,res) => {
  let Data = req.body;
  const respond = await createAccount(Data.PhoneNumber,Data.encPass,Data.FirstName,Data.LastName,Data.Created);
  res.json(respond);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);

})