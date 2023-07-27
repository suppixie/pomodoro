const express = require('express');
const app = express();
const mysql = require ('mysql');
const path = require('path');
require("dotenv").config();

var bodyParser = require('body-parser'); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password6',
  database: 'pondo_login',
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ' + error);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.static(path.join(__dirname, 'pomo')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'auth')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pomo', 'pomodoro.html'));
});


// ----------------------------------------

// login
// app.get('/',(req,res) =>{
//   res.sendFile(__dirname +'/auth/login.html');
// })

app.get('/login',(req,res) =>{
  res.sendFile(path.join(__dirname, 'auth', 'login.html'));
})

app.post('/login',(req,res) => {
  const {email, password } = req.body;
  const sql = 'SELECT * FROM pondo_login.login WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error executing the database query: ' + error);
      return res.sendStatus(500);
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Login failed. Please check your credentials.' });
    } 
    res.redirect('/pomodoro.html');    

  });
})

// register

app.get('/registration',(req,res) =>{
  res.sendFile(path.join(__dirname, 'auth', 'registration.html'));
})

app.post('/registration',(req,res) => {
  const { username, email, password } = req.body;
    var sql = "INSERT INTO pondo_login.login (username,email,password) VALUES (?,?,?)"
    connection.query(sql,[username,email,password],(error, results) => {
      if (error) {
        console.error('Error executing the database query: ' + error);
        return res.sendStatus(500);
      }
      res.redirect('/pomodoro.html');
    });
  });





const port = 3000;
app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});