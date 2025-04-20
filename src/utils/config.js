const express = require("express");
const dotenv = require('dotenv');
//const mongoSanitize = require('express-mongo-sanitize') //Làm sạch input chứa cú pháp MongoDB độc hại (`$`, `.`) – ngăn tấn công NoSQL Injection.

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL|| '';
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true', 
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: process.env.CORS_METHODS
      ? process.env.CORS_METHODS.split(',') // ví dụ: "GET,POST,PUT"
      : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  };

// const configViewEngine = (app) => {
//   app.use(express.static("./src/public"));
//   app.set("view  engine", "ejs");
//   app.set("views", "./src/views");
// };

// Middleware để xử lý các yêu cầu từ client
const middleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(express.static("uploads"));
  app.use(express.static("views"));
  app.use(express.static("src/public"));
  app.use(express.static("src/views"));
};

module.exports = {MONGO_URL,PORT, corsOptions, middleware};