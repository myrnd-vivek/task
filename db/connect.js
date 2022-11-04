const mongoose = require("mongoose");

// const connectionString =
//     "mongodb+srv://user_01:sQsgTzJcZnZfcoUs@nodeexpress.ycgpi.mongodb.net/?retryWrites=true&w=majority";

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;