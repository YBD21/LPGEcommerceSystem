import express, { json, urlencoded } from 'express';
import cors from 'cors';
import Multer from "multer"
import { login } from './LoginSystem/login.js';
import { passwordforget } from './LoginSystem/passwordforget.js';
import { resetPassword } from './LoginSystem/resetpassword.js';
import { createAccount } from './LoginSystem/signup.js';
import { CreateProduct } from './ProductManagement/CreateProductSystem/createProduct.js';
import { ImageUpload } from './ProductManagement/CreateProductSystem/imageUpload.js';
import { CheckExistenceOfImage, CheckExistenceOfProductData } from './ProductManagement/CreateProductSystem/checkExistence.js'
import { updateGasRate, sendGasRate } from './ProductManagement/UpdateProduct/updateGasRate.js';

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

  const respond = await login(Data.PhoneNumber, Data.Password);
  // console.log(respond);
  res.json(respond);
});

app.post('/ForgetPassword', async (req, res) => {
  let Data = req.body;
  const respond = await passwordforget(Data.PhoneNumber);
  //  console.log(respond);
  res.json(respond);
});

app.patch('/ResetPassword', async (req, res) => {
  let Data = req.body;
  const respond = await resetPassword(Data.PhoneNumber, Data.EncPass);
  res.json(respond);
});

app.post('/SignUp', async (req, res) => {
  let Data = req.body;
  const respond = await createAccount(Data.PhoneNumber, Data.encPass, Data.FirstName, Data.LastName, Data.Created);
  res.json(respond);
});

app.post('/updateGasRate', async (req, res) => {
  let data = req.body;
  const respond = await updateGasRate(data.RefillRate,data.NewGasRate);
  res.json(respond);
});

app.get('/GasRate'), async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("connection", "keep-alive");
  res.setHeader("Content-Type", "text/event-stream");

  // res.write(`data: Hello, World!\n\n`);

  const respond = await sendGasRate();

  res.json(respond);
}

app.post('/uploadData', multer.single('img'), async (req, res) => {
  let data = JSON.parse(req.body.data);
  // console.log(data);
  const imageStatus = await CheckExistenceOfImage(req.file);
  const productDataStatus = await CheckExistenceOfProductData(data);

  if (!imageStatus.imageError && !productDataStatus.productDataError) {
    const getUrl = await ImageUpload(req.file);
    const respond = await CreateProduct(data, getUrl);
    return res.json(respond);
  }
  // imageExist but productData is not
  if (imageStatus.imageError && !productDataStatus.productDataError) {
    // get the image name and url 
    const getUrl = await ImageUpload(req.file);
    // create product
    const respond = await CreateProduct(data, getUrl);
    return res.json(respond);
  }

  let error = { ...imageStatus, ...productDataStatus };
  return res.json(error);
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})