const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const randomInt = require("random-int");

const server = express();
server.use(express.static("public")); // user thoai mai vao
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const readFileJson = () => {
  const data = JSON.parse(
    fs.readFileSync("./data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    })
  );
  const index = randomInt(0, data.length - 1);
  return data[index];
};

server.get("/", (req, res) => {
  const question = readFileJson();
  const All = question.yes + question.no;
  const perYes = question.yes * 100 / All;
  const perNo = 100 - perYes;
  // console.log(question.content);
  // const qs = document.getElementById('question');
  // qs.innerText = question.content;
  let homeHtml = fs.readFileSync("./public/home.html", "utf8");
  fs.writeFile(
    "./public/home.html",
    homeHtml.replace("%question", question.content),
    err => {
      if (err) {
        throw err;
      }
      console.log("ok!");
    }
  );
  // res.status(200).sendFile(path.resolve(__dirname + "/public/home.html"));
  res.status(200).send(homeHtml);
});

server.post("/", (req, res) => {
  const data = JSON.parse(
    fs.readFileSync("./data.json", "utf8", (err, data) => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    })
  );
  // console.log(data[0].yes);
  // console.log(req.body.yesno);
  const homeHtml = fs.readFileSync("./public/home.html", "utf8");
  for (const obj in data) {
    const bool = homeHtml.indexOf(data[obj].content);
    // console.log(homeHtml);
    // console.log(data[obj].content);
    console.log(req.body.yesno);
    if (bool != -1) {
      if (req.body.yesno === "yes") {
        data[obj].yes += 1;
      } else {
        data[obj].no += 1;
      }
      fs.writeFile(
        "./public/home.html",
        homeHtml.replace(data[obj].content, '%question'),
        err => {
          if (err) {
            throw err;
          }
        }
      );
    }
    fs.writeFile("./data.json", JSON.stringify(data), err => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    });
  }
  res.status(200).send("ok!");
});

server.get("/create_question", (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/create_question.html"));
});

server.post("/create_question", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("error"); //luon luon check
    }
    const rawdata = JSON.parse(data); //JSON.stringify
    rawdata.push({
      id: rawdata.length,
      content: req.body.content,
      yes: 0,
      no: 0,
      createdAt: new Date().toLocaleString()
    });
    fs.writeFile("./data.json", JSON.stringify(rawdata), err => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      }
    });
  });
});

server.listen(3000, err => {
  if (err) {
    throw err;
  }
  console.log("ok!");
});
