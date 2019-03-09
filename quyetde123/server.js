const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const questionModel = require("./model");

mongoose.connect("mongodb://localhost:27017/quyetde", err => {
  if (err) {
    throw err;
  }
  console.log("Connect to Mongodb success");

  const server = express();
  server.use(express.static("public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, "./public/index.html"));
  });

  server.get("/create-question", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/create-question.html"));
  });

  server.post("/create-question", async (req, res) => {
    const newQuestion = {
      content: req.body.content
    };

    const result = await questionModel.create(newQuestion);
    console.log(result);

    res.status(201).json({ 
      id: result._id
    });
  });

  server.get("/vote/:questionId/:vote", async (req, res) => {
    const { questionId, vote } = req.params;
    const questions = await questionModel.find();
    for (let item of questions) {
      if (String(item._id) === questionId) {
        if (vote === 'yes') {
          questionModel.updateOne({_id: questionId}, {$inc: {yes: 1}}, (err,data) => {
            if (err) {
              throw err;
            }
            console.log('vote success');
          });
        } else { 
          questionModel.updateOne({_id: questionId}, {$inc: {no: 1}}, (err,data) => {
            if (err) {
              throw err;
            }
            console.log('vote success'); 
          });
        }
      }
    } 
  });

  server.get("/result/:questionId", (req, res) => { 
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/vote-result.html"));
  });
 
  server.get("/get-question-by-id", async (req, res) => {
    const questionId = req.query.questionId;
    const questions = await questionModel.find();
    let selectQuestion;
    for (let item of questions) {
      if (String(item._id) === questionId) {
        selectQuestion = item; 
        break;
      }
    }
    if (selectQuestion) {
      res.status(200).json(selectQuestion);
    } else {
      res.status(200).json({ message: "Question not found" });
    }
  });

  server.get("/random-question", async (req, res) => {
    const questions = await questionModel.find();
    let questionId = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[questionId];
    res.status(200).json(randomQuestion);  
  });

  server.listen(3000, error => {
    if (error) {
      throw error;
    }
    console.log("Server listen on port 3000...");
  });
});
