const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const questionModel = require('./model');

mongoose.connect('mongodb://localhost:27017/quyetde', (err) => {
  if (err) {
    throw err;
  }
  console.log('Connect to Mongodb success');

  const server = express();
  server.use(express.static('public'));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/index.html'));
  });

  server.get('/create-question', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/create-question.html'));
  });

  server.post('/create-question', async (req, res) => {
    const newQuestion = {
      content: req.body.content,
    };
    
    const result = await questionModel.create(newQuestion);

    res.status(201).json({
      id: result._id, 
    });
  });

  server.get('/vote/:questionId/:vote', async (req, res) => {
    const { questionId, vote } = req.params;

    const existedQuestion = await questionModel.findById(questionId).exec();
    if (!existedQuestion) {
      res.status(404).end('Question not found');
    } else {
      await questionModel.findByIdAndUpdate(questionId, {$inc: {[vote]: 1}}).exec();
      res.status(200).end('Update success');
    }
  });

  server.get('/result/:questionId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, './public/vote-result.html'));
  });

  server.get('/get-question-by-id', async (req, res) => {
    const questionId = req.query.questionId;
    const question = await questionModel.findById(questionId).exec();
    res.status(200).json(question);
  });

  server.get('/random-question', async (req, res) => {
    try {
      const randomQuestion = await questionModel.aggregate([
        { $sample: { size: 1 } }
      ]);

      res.status(200).json(randomQuestion[0]);
    } catch (error) {
      res.status(500).end(error.message);
    }
  });

  server.listen(3000, (error) => {
    if (error) {
      throw error;
    }
    console.log('Server listen on port 3000...');
  });
});
