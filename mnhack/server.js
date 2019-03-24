const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const scoreModel = require("./model");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/minihack", err => {
  if (err) {
    throw err;
  }
  console.log("Connect to Mongodb success");

  const server = express();
  server.use(express.static("public"));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/", (req, res) => {
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/create-screen.html"));
  });

  server.post("/create-keeper", async (req, res) => {
    const newKeeper = {
      keeper: [
        req.body.keeper1,
        req.body.keeper2,
        req.body.keeper3,
        req.body.keeper4
      ]
    };

    const result = await scoreModel.create(newKeeper);

    res.status(201).json({
      id: result._id
    });
  });

  server.get("/games/:keeperId", (req, res) => {
    const keeperId = req.params;
    console.log(keeperId); 
    res
      .status(200)
      .sendFile(path.resolve(__dirname, "./public/play-screen.html"));
  });

  server.get("/get-player-screen/:id", async (req, res) => {
    const gameId = req.params.id;
    try {
      let game = await scoreModel.find({ _id: gameId });
      const scoreGame = game.score;
      let total1 = 0;
      let total2 = 0;
      let total3 = 0;
      let total4 = 0;
      scoreGame.forEach(round => {
        total1 += round[0];
        total2 += round[1]; 
        total3 += round[2]; 
        total4 += round[3]; 
      });
      res.status(200).json({ 
        keeper1: game.keeper[0],
        keeper2: game.keeper[1],
        keeper3: game.keeper[2],
        keeper4: game.keeper[3],
        total1: total1,  
        total2: total2,
        total3: total3,
        total4: total4
      });
    } catch (error) {
      console.error(error);
    }
  });

  server.listen(3000, error => {
    if (error) {
      throw error;
    }
  });
});
