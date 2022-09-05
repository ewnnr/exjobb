import express from "express";
import cors from "cors";
import data from './data.js'
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config.js";
import userRouter from "./routers/userRouter.js";

//mongoose för att ansluta till databasen
mongoose.connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(() => {
        console.log('Ansluten till mongodb-databas');
    })
    .catch((error) => {
        console.log(error);
    });
//Express-app och den använder sig av cors samt bodyparser
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.get("/api/produkter", (req, res) => {
    res.send(data.products);
});
//GET för enskilda produkter
app.get('/api/produkter/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'Produkten hittades inte' })
    }
});

//Porten som används i localhost
app.listen(8080, () => {
    console.log('Porten 8080 har startat!');
});