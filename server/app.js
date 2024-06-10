const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Environment variable for the MongoDB URI
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const initializeDbAndServer = async () => {
  try {
    await client.connect();
    db = client.db('myDatabase'); 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}....`);
    });
  } catch (error) {
    console.log(`db.error: ${error.message}`);
  }
};

initializeDbAndServer();


// Login API
app.post('/api/login', async (request, response) => {
  const { email, password } = request.body;
  if (email === undefined || password === undefined) {
    response.status(400).send({ "error": "Invalid password" });
  }
  const dbUser = await db.collection('user_table').findOne({ email });
  if (dbUser === null) {
    response.status(400).send({ "error": "Invalid Username" });
  } else {
    const isPasswordMatch = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatch) {
      const payLoad = { email };
      const jwtToken = jwt.sign(payLoad, 'sai_token');
      response.send({ jwtToken });
    } else {
      response.status(400).send({ "error": "Invalid password" });
    }
  }
});

// Register API
app.post('/api/register', async (request, response) => {
  const { username, email, password } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const dbUser = await db.collection('user_table').findOne({ email });
  if (dbUser === null) {
    if (password.length >= 5) {
      await db.collection('user_table').insertOne({ username, email, password: hashedPassword });
      response.status(200).send({ "error": "Successful registration of the registrant" });
    } else {
      response.status(400).send({ "error": "Password is too short" });
    }
  } else {
    response.status(400).send({ "error": "User already exists" });
  }
});

// Forgot Password API
app.post('/api/forgot-password', async (request, response) => {
  const { email, password } = request.body;
  const user_details = await db.collection('user_table').findOne({ email });
  if (user_details === null) {
    response.status(400).send({ 'error': "Email Not Found" });
  } else {
    if (password.length < 6) {
      response.status(400).send({ 'error': "Password is Too Short" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.collection('user_table').updateOne({ email }, { $set: { password: hashedPassword } });
      response.status(200).send({ "msg": "New password set successfully" });
    }
  }
});

// Middleware function
const accessTokenFunction = (request, response, next) => {
  const authHeader = request.headers['authorization'];
  let jwtToken;
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1];
  }
  if (jwtToken === undefined) {
    response.status(401).send('Invalid JWT Token');
  } else {
    jwt.verify(jwtToken, 'sai_token', (error, user) => {
      if (error) {
        response.status(401).send('Invalid JWT Token');
      } else {
        request.user = user;
        next();
      }
    });
  }
};

// Profile API
app.get('/api/profile', accessTokenFunction, async (request, response) => {
  const { user } = request;
  const name = user.email;
  const profileName = await db.collection('user_table').findOne({ username: name }, { projection: { name: 1, user_id: 1 } });
  response.status(200).send({profileName})
});

module.exports = app;
