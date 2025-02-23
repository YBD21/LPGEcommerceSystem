import express, { json, urlencoded } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import fs from "fs";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import cookieParser from "cookie-parser";
import loginSystemRouter from "./LoginSystem/loginSystemRouter.js";
import { paymentSystemRouter } from "./PaymentSystem/paymentSystemRouter.js";
import {
  readGasRateFile,
  sendGasRate,
} from "./ProductManagement/UpdateRate/updateGasRate.js";

import {
  readDeliveryRatefile,
  sendDeliveryRate,
} from "./ProductManagement/UpdateRate/updateDeliveryRate.js";

import {
  sendProductList,
  readProductListfile,
} from "./ProductManagement/UpdateProduct/updateProduct.js";
import { releaseStockOnDisconnectWithAccessToken } from "./PaymentSystem/stockReservation.js";
import productManagementSystemRouter from "./ProductManagement/productManagementSystemRouter.js";
import orderManagementSystemRouter from "./OrderManagement/orderManagementSystemRouter.js";
import {
  checkUpdateOrderData,
  getAllOrderData,
} from "./OrderManagement/orderOperation.js";
import userManagementSystemRouter from "../Routes/UserManagement/userManagementSystemRouter.js";
import * as dotenv from "dotenv";
import { getDashBoardData } from "./dashBoardOperation.js";

dotenv.config();

const app = express();

app.use(helmet());

//set proxy
app.set("trust proxy", 1);

// connecting to same localhost as app for socket.io
const httpServer = createServer(app);

const url = process.env.URL || "http://localhost:3000";
console.log(url);

// Enable CORS for the socket connection
const io = new Server(httpServer, {
  cors: { origin: url, credentials: true }, // set credentials to true
});

const port = process.env.PORT || 5000;

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
    origin: url,
    credentials: true,
  })
);

app.use(json({ limit: "1mb" }));

app.use(urlencoded({ extended: false }));

app.use(cookieParser());

// Define the updateBufferData function
const updateBufferData = async () => {
  await sendProductList();
  await sendDeliveryRate();
  await sendGasRate();
};

// Immediately invoke the updateBufferData function

updateBufferData(); //-- Testing mode remove comment here

// Mount userRouter middleware at "/login-System" path
app.use("/login-system", apiLimiter, loginSystemRouter);

// Mount userRouter middleware at "/payment-system" path
app.use("/payment-system", paymentSystemRouter);

// Mount userRouter middleware at "/product-management" path
app.use("/product-management", productManagementSystemRouter);

// Mount userRouter middleware at "/order-management" path
app.use("/order-management", orderManagementSystemRouter);

// Mount userRouter middleware at "/order-management" path
app.use("/user-management", userManagementSystemRouter);

const filePathGasRate = "BufferData/gasRate.json";
const filePathDeliveryRate = "BufferData/deliveryRate.json";
const filePathProductList = "BufferData/productList.json";

io.on("connection", (socket) => {
  socket.on("AdminDashBoard", async () => {
    const userId = socket.handshake.query.userId;
    const userRole = socket.handshake.query.userRole;

    if (userRole === "Admin") {
      console.log(
        `User ID : ${userId} with Role of : ${userRole} is Accessing DashBoard !`
      );
      const dashBoardData = await getDashBoardData();
      return socket.emit("updateAdminDashBoard", dashBoardData);
    }
  });

  socket.on("ViewOrderListAdmin", async () => {
    const userId = socket.handshake.query.userId;
    const userRole = socket.handshake.query.userRole;

    if (userRole === "Admin") {
      console.log(
        `User ID : ${userId} with Role of : ${userRole} is Accessing getAllOrder !`
      );
      const OrderData = await getAllOrderData();
      return socket.emit("updateViewOrderListAdmin", OrderData);
    }
  });

  socket.on("updateViewOrderdata", async () => {
    const userId = socket.handshake.query.userId;
    const orderBy = socket.handshake.query.orderBy;
    const searchFromUnixTimeStamp = +socket.handshake.query.dateTime;
    const comparisonOperator = socket.handshake.query.operator;
    // console.log(userId);
    const { OrderData } = await checkUpdateOrderData(
      userId,
      orderBy,
      searchFromUnixTimeStamp,
      comparisonOperator
    );

    socket.emit("updateViewOrder", OrderData);
  });

  // Send the current gas rate data when the client connects
  socket.on("getGasRate", async () => {
    const respond = await readGasRateFile();
    socket.emit("gasRate", respond);
  });

  // Send the current Delivery Rate data when the client connects
  socket.on("getDeliveryRate", async () => {
    const respond = await readDeliveryRatefile();
    socket.emit("deliveryRate", respond);
  });

  // Send the current ProductList data when the client connects
  socket.on("getProductList", async () => {
    const respond = await readProductListfile();
    socket.emit("productList", respond);
  });

  // For gasRate
  try {
    // look for change in gasRateFile
    fs.watch(filePathGasRate, async (eventType, filename) => {
         // Check time when the file was modified
      if (eventType === "change") {
        console.log(`${filename} has been Changed !`);
        const respond = await readGasRateFile();
        io.emit("gasRate", respond);
      }
    });
  } catch (error) {
    console.error(`Error watching ${filePathGasRate}: ${error.message}`);
    // if file not found to watch
    sendGasRate();
  }

  // For deliveryRate
  try {
    // look for change in deliveryRateFile
    fs.watch(filePathDeliveryRate, async (eventType, filename) => {
      // Check time when the file was modified
      if (eventType === "change") {
        console.log(`${filename} has been Changed !`);
        const respond = await readDeliveryRatefile();
        io.emit("deliveryRate", respond);
      }
    });
  } catch (error) {
    console.error(`Error watching ${filePathDeliveryRate}: ${error.message}`);
    // if file not found to watch
    sendDeliveryRate();
  }

  // For productList
  try {
    // look for change in productList
    fs.watch(filePathProductList, async (eventType, filename) => {
      // Check time when the file was modified
      if (eventType === "change") {
        console.log(`${filename} has been Changed !`);
        const respond = await readProductListfile();
        io.emit("productList", respond);
      }
    });
  } catch (error) {
    console.error(`Error watching ${filePathProductList}: ${error.message}`);
    // if file not found to watch
    sendProductList();
  }

  // stop watch when user are disconnected
  socket.on("disconnect", async () => {
    console.log("User Disconnected X_X !");

    await releaseStockOnDisconnectWithAccessToken(socket);
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
