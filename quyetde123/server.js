const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const randomInt = require("random-int");

const server = express();
server.use(express.static("public")); // user thoai mai vao
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '/public/home.html'));
  // fs.readFile("./data.json", (err, data) => {
  //   if (err) {
  //     res.status(500).send("error"); //luon luon check
  //   }
  //   const question = JSON.parse(data);
  //   const randomIndex = Math.floor(Math.random() * question.length);
  //   const randomQuestion = question[randomIndex];
  //   res.status(200).send(`
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //       <title>Quyet De</title>
  //   </head>
  //   <body>
  //     <h2>${randomQuestion.content}</h2>
  //     <div>
  //       <form name= 'yes' method= 'get' action= '/vote/${randomQuestion.id}/yes'>
  //         <input type= 'submit' value= 'yes'>
  //       </form>
  //       <form name= 'no' method= 'get' action= '/vote/${randomQuestion.id}/no'>
  //         <input type= 'submit' value= 'no'>  
  //       </form> 
  //     </div>

  //     <div>
  //       <button id= 'question-result'>Result</button>  
  //       <button id= 'other-question'>Other</button>  
  //     </div>

  //     <script src= './public/index.js'></script>
  //   </body>
  //   </html>
  //   `);
  // });
});

server.get("/create_question", (req, res) => {
  const { contentQuestion } = req.query;

  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("error"); //luon luon check
    }
    const rawdata = JSON.parse(data); //JSON.stringify
    rawdata.push({
      id: rawdata.length,
      content: contentQuestion,
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
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/public/create_question.html"));
});

// server.post("/create_question", (req, res) => {
//   const { contentQuestion } = req.query;

//   fs.readFile("./data.json", (err, data) => {
//     if (err) {
//       res.status(500).send("error"); //luon luon check
//     }
//     const rawdata = JSON.parse(data); //JSON.stringify
//     rawdata.push({
//       id: rawdata.length,
//       content: contentQuestion,
//       yes: 0,
//       no: 0,
//       createdAt: new Date().toLocaleString()
//     });
//     fs.writeFile("./data.json", JSON.stringify(rawdata), err => {
//       if (err) {
//         res.status(500).send("error"); //luon luon check
//       }
//     });
//   });
// }); 

server.get("/vote/:questionId/:vote", async (req, res) => {
  const {questionId, vote} = req.params; // thay doi voi question khac nhau
  console.log(questionId, vote); 

  fs.readFile('./data.json', (err, data) => {
    if (err) { 
      res.status(500).send("error"); //luon luon check
    }
    const questions = JSON.parse(data);
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        vote === 'yes' ? item.yes += 1 : item.no += 1;
        break; 
      }
    }

    fs.writeFile('./data.json', JSON.stringify(question), (err) => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      } 
      res.status(200).send('update!');
    })
  })
}); 

server.post("/vote", (req, res) => {
  const { questionId, value } = req.query;

  fs.readFile('./data.json', (err, data) => {
    if (err) { 
      res.status(500).send("error"); //luon luon check
    }
    const questions = JSON.parse(data);
    if (value === 'yes') {
      questions[questionId].yes += 1;
    } else {
      questions[questionId].no += 1;
    }

    fs.writeFile('./data.json', JSON.stringify(questions), (err) => {
      if (err) {
        res.status(500).send("error"); //luon luon check
      } 
      res.status(200).send('update!');
    }) 
  })
}); 

server.get('/result/:questionId', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '/public/vote-result.html'));
});

server.get('/get-question-by-id', (req, res) => { 
  const questionId = req.query.questionId;   

  fs.readFile('./data.json', (err, data) => {
    if (err) {
      res.status(500).send("error"); //luon luon check
    }
    const questions = JSON.parse(data);
    let selectQuestion;
    for (let item of questions) {
      if (item.id === Number(questionId)) {
        selectQuestion = item;
        break;
      }
    }
    if (selectQuestion) {
      res.status(200).json(selectQuestion);
    } else {
      res.status(200).json({message: 'not found'}); 
    }
  });
});

server.get('/question-random', (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    if (err) {
      res.status(500).send("error"); //luon luon check
    }
    const question = JSON.parse(data); 
    const randomIndex = Math.floor(Math.random() * question.length);
    const randomQuestion = question[randomIndex];

    if (randomQuestion) {
      res.status(200).json(randomQuestion); 
    } else {
      res.status(200).json({message: 'not found'}); 
    }
  });
});

server.listen(3000, err => {
  if (err) {
    throw err;
  }
  console.log("ok!");
});
