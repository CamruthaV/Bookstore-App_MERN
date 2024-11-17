import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const PORT = process.env.PORT || 5000;
const MongoUrl = proces.env.MONGO_URI;

const app = express();

//Middleware for parsing request body
app.use(express.json());

// Middleware to handle CORS (Cross-Origin Resource Sharing)
// Method 1: Using npm package cors and allowing all origins with default of cors
app.use(cors());

// Method 2: Using npm package cors and allowing only specific origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ["Content-Type"],
//   })
// ); 

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send("Hello from Homepage");
});

app.use('/books', booksRoute);

mongoose
  .connect(MongoUrl)
  .then(() => {
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
