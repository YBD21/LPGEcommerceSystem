import express, { json, urlencoded } from 'express';
import cors from 'cors';
import Multer from "multer"
import {login} from './LoginSystem/login.js';
import { passwordforget } from './LoginSystem/passwordforget.js';
import { resetPassword } from './LoginSystem/resetpassword.js';
import { createAccount } from './LoginSystem/signup.js';
import { product } from './ProductManagement/Product.js';
import { FileUpload } from './ProductManagement/FileUpload.js';

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

// used for uploading files
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});
                             

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

// app.get('/Product'), (req,res) => {
//   res.statusCode = 200;
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("connection", "keep-alive");
//   res.setHeader("Content-Type", "text/event-stream");
 
//     res.write(`data: Hello, World!\n\n`);
//     res.json({
//       message: "Hello, World!"
//   });
// }

app.post('/upload', multer.single('file'), async (req, res) => {

      const respond = await FileUpload(req);
      res.json(respond);
      
});



app.listen(port,() => {
  console.log(`Listening on port ${port}`);
  // console.log(product());
})