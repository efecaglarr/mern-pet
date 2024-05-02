import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
})); 

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req,res) => {
  res.send('We are home!');
})

const PORT = process.env.PORT;

app.use((req, res) => {
  res.status(404).send('Not Found');
});

mongoose.connect(process.env.CONNECTION_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})
.catch((error) => {
  console.log(error.message)
});


