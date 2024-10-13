import express, { response } from "express";
import { PORT, mongodbUrl }from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/booksModels.js";
import booksRoutes from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

//Middleware for parsing req body
app.use(express.json());

//Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:8080',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );


//Middleware for routing
app.use('/books', booksRoutes);


// Home page or root page
app.get('/', (req, res) => {
    //console.log(req);
    return res.status(234).send("Welcome to MERN tutorial");
});

//database connector

mongoose
    .connect(mongodbUrl)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });


