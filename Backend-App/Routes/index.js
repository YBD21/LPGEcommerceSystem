import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import Multer from "multer";
import fs from "fs";
import { login } from "./LoginSystem/login.js";
import { passwordforget } from "./LoginSystem/passwordforget.js";
import { resetPassword } from "./LoginSystem/resetpassword.js";
import { createAccount } from "./LoginSystem/signup.js";
import { CreateProduct } from "./ProductManagement/CreateProductSystem/createProduct.js";
import { ImageUpload } from "./ProductManagement/CreateProductSystem/imageUpload.js";
import {
  CheckExistenceOfImage,
  CheckExistenceOfProductData,
} from "./ProductManagement/CreateProductSystem/checkExistence.js";
import {
  updateGasRate,
  readGasRateFile,
  sendGasRate,
} from "./ProductManagement/UpdateProduct/updateGasRate.js";
import {
  updateDeliveryRate, readDeliveryRatefile, sendDeliveryRate
} from "./ProductManagement/UpdateProduct/updateDeliveryRate.js";

const app = express();
// connecting to same localhost as app for socket.io
const httpServer = createServer(app);
// Enable CORS for the socket connection
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

const port = 5000;
//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());

app.use(urlencoded({ extended: false }));

// used for uploading files
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// req = request & res = respond
app.post("/login", async (req, res) => {
  let Data = req.body;

  const respond = await login(Data.PhoneNumber, Data.Password);
  // console.log(respond);
  res.json(respond);
});

app.post("/ForgetPassword", async (req, res) => {
  let Data = req.body;
  const respond = await passwordforget(Data.PhoneNumber);
  //  console.log(respond);
  res.json(respond);
});

app.patch("/ResetPassword", async (req, res) => {
  let Data = req.body;
  const respond = await resetPassword(Data.PhoneNumber, Data.EncPass);
  res.json(respond);
});

app.post("/SignUp", async (req, res) => {
  let Data = req.body;
  const respond = await createAccount(
    Data.PhoneNumber,
    Data.encPass,
    Data.FirstName,
    Data.LastName,
    Data.Created
  );
  res.json(respond);
});

app.post("/updateDeiveryRate", async (req, res) => {
  let data = req.body;
  const respond = await updateDeliveryRate(data.RefillRate,data.NewGasRate);
  res.json(respond);
});

app.post("/updateGasRate", async (req, res) => {
  let data = req.body;
  const respond = await updateGasRate(data.RefillRate, data.NewGasRate);
  res.json(respond);
});

const filePathGasRate = "BufferData/gasRate.json";
const filePathDeliveryRate = 'BufferData/deliveryRate.json';
io.on("connection", (socket) => {
  // Send the current gas rate data when the client connects
  socket.on("getGasRate", async () => {
    const respond = await readGasRateFile();
    socket.emit("gasRate", respond);
  });

  socket.on("getDeliveryRate", async () => {
    const respond = await readDeliveryRatefile();
    socket.emit("deliveryRate", respond);
  });

  try {
    // look for change in gasRateFile
    fs.watch(filePathGasRate, async (eventType, filename) => {
      if (eventType === "change" && filename === filePathGasRate) {
        const respond = await readGasRateFile();
        socket.emit("gasRate", respond);
      }
    });
  } catch (error) {
    // if file not found to watch
    sendGasRate();
  }

  try {
    // look for change in gasRateFile
    fs.watch(filePathDeliveryRate, async (eventType, filename) => {
      if (eventType === "change" && filename === filePathDeliveryRate) {
        const respond = await readDeliveryRatefile();
        socket.emit("deliveryRate", respond);
      }
    });
  } catch (error) {
    // if file not found to watch
    sendDeliveryRate();
  }

  // stop watch when all are disconnected
  socket.on("disconnect", () => {
    fs.unwatchFile(filePathGasRate);
    fs.unwatchFile(filePathDeliveryRate);
  });
});

app.post("/uploadData", multer.single("img"), async (req, res) => {
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

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
