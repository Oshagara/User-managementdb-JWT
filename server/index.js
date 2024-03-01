const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken');


// middleware
app.use(cors());
app.use(express.json()); 

//connecting to mongodb
mongoose
  .connect(
    `mongodb+srv://oshagaras:YiJO3PQKqF1puQBf@crud-app-db.pkpwveq.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(
    console.log("Mongodb connected successfully!")
  )
  .catch((error) => console.log("Error connecting to Mongodb"));


  
  //import routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

//post request for a token
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1min' });
  res.send({ token });
})

// middlewares 
const verifyToken = (req, res, next) => {
  console.log("Token:", req.headers.authorization)

  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'unauthorized access' });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'unauthorized access' })
    }
    req.decoded = decoded;
    next();
  })
}

app.get('/', verifyToken, (req, res) => {
  res.send('Hey Oshagara!, Welcome')
})

app.listen(port, () => {
  console.log(`Hey Oshagara! Your app is listening on port ${port}`)
})