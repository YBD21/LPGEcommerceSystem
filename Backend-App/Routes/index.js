import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import Multer from "multer";
import fs from "fs";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import cookieParser from "cookie-parser";
import loginSystemRouter from "./LoginSystem/loginSystemRouter.js";
import paymentSystemRouter from "./PaymentSystem/paymentSystemRouter.js";
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
} from "./ProductManagement/UpdateRate/updateGasRate.js";
import {
  updateDeliveryRate,
  readDeliveryRatefile,
  sendDeliveryRate,
} from "./ProductManagement/UpdateRate/updateDeliveryRate.js";

import {
  sendProductList,
  readProductListfile,
} from "./ProductManagement/UpdateProduct/updateProduct.js";

const app = express();

app.use(helmet());

//set proxy
app.set("trust proxy", 1);

// connecting to same localhost as app for socket.io
const httpServer = createServer(app);
// Enable CORS for the socket connection
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000" },
});

const port = 5000;

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many attempts, please try again later",
});

const speedLimiter = slowDown({
  windowMs: 30 * 60 * 1000, // 30 minutes
  delayAfter: 50, // allow 50 requests per 30 minutes, then...
  delayMs: 500, // begin adding 5ms of delay per request above 50:
});

app.use(speedLimiter);

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json({ limit: "1mb" }));

app.use(urlencoded({ extended: false }));

app.use(cookieParser());

// used for uploading files
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// Mount userRouter middleware at "/login-System" path
app.use("/login-system", apiLimiter, loginSystemRouter);

// Mount userRouter middleware at "/payment-system" path
app.use("/payment-system", paymentSystemRouter);

app.post("/updateDeiveryRate", async (req, res) => {
  let data = req.body;
  const respond = await updateDeliveryRate(data.RefillRate, data.NewGasRate);
  res.json(respond);
});

app.post("/updateGasRate", async (req, res) => {
  let data = req.body;
  const respond = await updateGasRate(data.RefillRate, data.NewGasRate);
  res.json(respond);
});

const filePathGasRate = "BufferData/gasRate.json";
const filePathDeliveryRate = "BufferData/deliveryRate.json";
const filePathProductList = "BufferData/productList.json";

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

  socket.on("getProductList", async () => {
    const respond = await readProductListfile();
    socket.emit("productList", respond);
  });

  // For gasRate
  try {
    // look for change in gasRateFile
    fs.watchFile(filePathGasRate, async (current, prev) => {
      // Check time when the file was modified
      if (current.mtime !== prev.mtime) {
        console.log("GasRate has been Changed !");
        const respond = await readGasRateFile();
        socket.emit("gasRate", respond);
      }
    });
  } catch (error) {
    console.log(error.message);
    // if file not found to watch
    sendGasRate();
  }

  // For deliveryRate
  try {
    // look for change in deliveryRateFile
    fs.watchFile(filePathDeliveryRate, async (current, prev) => {
      // Check time when the file was modified
      if (current.mtime !== prev.mtime) {
        console.log("DeliveryRate has been Changed !");
        const respond = await readDeliveryRatefile();
        socket.emit("deliveryRate", respond);
      }
    });
  } catch (error) {
    console.log(error.message);
    // if file not found to watch
    sendDeliveryRate();
  }

  // For productList
  try {
    // look for change in productList
    fs.watchFile(filePathProductList, async (current, prev) => {
      // check time when the file was modified
      if (current.mtime !== prev.mtime) {
        console.log("Product List has been Changed !");
        const respond = await readProductListfile();
        socket.emit("productList", respond);
      }
    });
  } catch (error) {
    console.log(error.message);
    // if file not found to watch
    sendProductList();
  }

  // stop watch when all are disconnected
  socket.on("disconnect", () => {
    fs.unwatchFile(filePathGasRate);
    fs.unwatchFile(filePathDeliveryRate);
    fs.unwatchFile(filePathProductList);
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
