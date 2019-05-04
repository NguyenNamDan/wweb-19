const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const productRouter = require('./api/posts/routes');
const authRouter = require("./api/auth/routes");
const orderRouter = require("./api/orders/routes");
const expressSession = require("express-session");
const formidable = require("formidable");
const path = require("path"); 
const fs = require("fs");

mongoose.connect("mongodb://localhost:27017/hackathon", error => {
  if (error) {
    throw error;
  }

  const server = express();
  server.use(express.static('public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

  // routes
  server.use("/api/posts", productRouter);
  server.use("/api/auth", authRouter); 
  server.use("/api/orders", orderRouter); 

  server.post("/upload-image", (req, res, next) => {
    let form = new formidable.IncomingForm(); 
    form.uploadDir = "./public/image";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10mb
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        res.status(500).json({
          result: "failed",
          data: {},
          message: `${err}`
        })
      }
      const arrayOfFiles = files[""];
      if (arrayOfFiles.length > 0) {
        let fileName = [];
        arrayOfFiles.forEach((eachFile) => {
          // fileName.push(eachFile.path)
          fileName.push(eachFile.path.split("/")[2]); 
        });
        res.status(201).json({
          result: "ok",
          data: fileName,
          numberOfImages: fileName.length,
          message: "success"
        })
      } else {
        res.status(500).json({
          result: "failed",
          data: {},
          numberOfImages: 0,
          message: "failed" 
        })
      }
    })
  })

  server.get("/open-image", (req, res, next) => {
    const imageName = "./public/image/" + req.query.image_name;
    fs.readFile(imageName, (err, imageData) => {
      if (err) {
        res.status(500).json({
          result: "failed",
          message: `${err}`
        })
        return;
      } 
      res.writeHead(200, {"Content-Type": "image/jpeg"});
      res.end(imageData);
    })
  })

  server.listen(3001, error => {
    if (error) {  
      throw error;
    }
    console.log("Server listen on port 3001...");
  });
});
