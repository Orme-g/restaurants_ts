const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// const movieRoutes = require('../routes/movie-routes')
const restaurantRoutes = require("../routes/restaurant-routes");
const donerRoutes = require("../routes/doner-routes");
const commentRoutes = require("../routes/comment-routes");
const reviewRoutes = require("../routes/review-routes");
const userRoutes = require("../routes/user-routes");
const eventRoutes = require("../routes/event-routes");
const blogRoutes = require("../routes/blog-routes");

const PORT = 4000;
const URL = "mongodb://localhost:27017/restaurants_db";
// const URL = "mongodb://192.168.31.198:27017/restaurants_db";

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000", // Разрешаем запросы с http://localhost:3000
        // methods: ["GET", "POST"]       // Какие запросы разрешены
    })
);

// app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
// app.use(movieRoutes)
app.use(restaurantRoutes);
app.use(donerRoutes);
app.use(commentRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
app.use(eventRoutes);
app.use(blogRoutes);

mongoose
    .connect(URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(`DB connection failed: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
