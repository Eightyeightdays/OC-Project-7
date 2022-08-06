require("dotenv").config({path: "./.env", silent: process.env.NODE_ENV === 'production'});

const path = require("path");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Connected to MongoDB"))
    .catch(()=> console.log("Failed to connect to MongoDB"));

const cors = require("cors");
app.use(cors({origin: true, credentials: true}));

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(express.json());

app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;