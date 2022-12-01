const dotenv = require("dotenv");
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const RouteProduct = require("./route/routeProduct")
const app = express();
const cors = require("cors");

app.use(cors())


dotenv.config({ path: "./config.env" });
require("./db/conn");
const port = process.env.PORT;

// Require model
const Users = require("./models/userSchema");
const authenticate = require("./middleware/authenticate");

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("19521425-19521462-19521787-19521822");
});

// Registration
app.post("/signup", async (req, res) => {
  try {
    // get body or Data
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const createUser = new Users({
      username: username,
      email: email,
      password: password,
      role: 'Admin',
    });

    // Save method is used to create user
    const created = await createUser.save();
    console.log(created);
    res.status(200).send("Registered Successfully !!!");
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // find user if exists
    const user = await Users.findOne({ email: email });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);

      if (isMatch) {
        // generate token which is define in user schema
        const token = await user.generateToken();
        res.cookie("jwt", token, {
          // expires token in 24 hours
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).send("LoggedIn Successfully !!!");
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// logout page
app.get("/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).send("User logged out");
});
app.get('/getUser', async(req, res)=> {
  try{
    const data = await Users.find()
    res.json(data)
  }
  catch (error) {
    res.status(400).send(error);
  }
});

app.use("/product", RouteProduct);

// authentication
app.get("/auth", authenticate, (req, res) => {});

app.get("/getoneUser", async(req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).send("No token");
    } else {
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      const rootUser = await Users.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
      });
      if (!rootUser) {
        res.status(401).send("User not found");
      } else {
        res.json(rootUser)
      }
    }
  } catch (error) {
    res.status(401).send("Error");
    console.log(error);
  }
})
// run server - npm run dev
app.listen(port, () => {
  console.log("Server is Started " + port);
});
