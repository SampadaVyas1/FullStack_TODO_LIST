const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const todoRoute = require("./routes/todo");
const { pool } = require("./config/database");


app.use(cors());
app.use(bodyParser.json());
app.use("/api/todo", todoRoute);

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to mysql");
        connection.release();
    }
    catch (e) {
        console.error("MySQL Connection Failed:", e);
    }
})()


app.listen(5003, () => {
    console.log("Server running at 5003");
});