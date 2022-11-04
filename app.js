const express = require("express");
const connectDB = require("./db/connect");
const task = require("./routes/tasks");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const customErrorHandler = require("./middleware/error-handler");

const app = express();
const port = process.env.PORT || 3000;



//middleware

app.use(express.json());
app.use(express.static("./public"));


//Routes

app.use("/api/v1/tasks", task);
app.use(notFound);
app.use(customErrorHandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is listening at port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();