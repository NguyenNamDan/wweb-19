const express = require("express");
const bcryptjs = require("bcryptjs");
const UserModel = require("../users/models");
const PostModel = require("../posts/models");
const path = require("path");
const bodyParser = require("body-parser");

const authRouter = express();
authRouter.use(express.static('../../../font-end')); 
authRouter.use(bodyParser.urlencoded({ extended: false }));
authRouter.use(bodyParser.json()); 

// register

authRouter.get("/register", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../../font-end/html/register.html'));
}); 

authRouter.post("/register", async (req, res) => {
  //create user
  try { 
    const userInfo = JSON.parse(req.body.userInfo);
    const hashPassword = await bcryptjs.hash(userInfo.password, 10);
    console.log(userInfo);  
    //check email
    const existEmail = await UserModel.findOne({
      email: userInfo.email
    }).exec();
    if (existEmail) { 
      res.status(403).end("Email has been used");
    } else {
      //save to db
      const newUser = await UserModel.create({
        ...userInfo,
        password: hashPassword, 
        permissions: "POST.CREATE"
      });
  
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).send(error.massage);
  }
});

// login
authRouter.post("/login", async (req, res) => {
  try {
    const loginInfo = JSON.parse(req.body.loginInfo); 
    const user = await UserModel.findOne({ email: loginInfo.email }).exec();

    if (!user) {
      res.status(404).json({
        message: "user not found",
        success: false 
      });
    } else {
      const comparePassword = await bcryptjs.compare(
        loginInfo.password,
        user.password
      );

      if (comparePassword) {

        req.session.user = {
            _id: user._id,
            email: user.email,
            permissions: user.permissions.length > 0 ? user.permissions : [],
        };
        req.session.save();

        res.status(200).json({
          message: "login success",
          success: true
        });
      } else {
        res.status(200).json({
          message: "password isnt correct",
          success: false
        });
      }
    }
  } catch (error) {
    res.status(500).send(error.massage);
  }
});

authRouter.get('/test', (req, res) => {
    console.log(req.session.user);
    res.status(200).end();
})

// logout 
authRouter.get('/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({
            message: 'logout success',
            success: true,
        })
    } catch (error) {
        res.status(500).send(error.massage);
    }
})

authRouter.post("/create-post", async (req, res) => {
  try {
    if (!req.session.user) {
      res.status(403).json({
        message: 'unanthenticated',
      })
    } 
    if (req.session.user && req.session.user.permissions.indexOf('POST.CREATE') > -1) {
      const postInfo = JSON.parse(req.body.postInfo);
      const newPost = await PostModel.create(postInfo);
      res.status(201).json(newPost);
    } else {
      res.status(403).json({
        message: 'unaithorized',
      })
    }
  } catch (error) {
    res.status(500).send(error.massage);
  }
});

authRouter.get("/get-post-by-id/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const postInfo = await PostModel.findById(postId)
      //   .populate('author', 'email firstName createAt')
      .populate({
        path: "author",
        select: "email firstName lastName"
      })
      .exec();

    res.status(200).json(postInfo);
  } catch (error) {
    res.status(500).send(error.massage);
  }
});

authRouter.get("/", async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const totalRecord = await PostModel.find().countDocuments();
    console.log(totalRecord);
    const data = await PostModel.find()
      .skip(pageSize * (pageNumber - 1))
      .limit(Number(pageSize))
      .exec();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error.massage);
  }
});
module.exports = authRouter;
