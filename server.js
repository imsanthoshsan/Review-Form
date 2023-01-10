// Create the connection to the database
const mysql = require("mysql2");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1@345678",
  database: "review",
});

// Create the express app
const express = require("express");
const app = express();

// Enable CORS
const cors = require("cors");
app.use(cors());

// Parse the request body as JSON

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true })); // this form not using json so that we are using bodyParser to convert the url into data
//why we changed app.use(bodyParser...
//because in body we are not sending data in json format
// Set up the route to handle the form submission
app.post("/submit", (req, res) => {
  // submit is the end point
  // Get the form data from the request body
  const { name, review, rating } = req.body;
  console.log(name, review, rating);
  console.log(req.boby);
  // Insert the review data into the database
  const sql = "INSERT INTO reviews (name, review, rating) VALUES (?, ?, ?)";
  const params = [name, review, rating];
  conn.query(sql, params, (error, results) => {
    if (error) {
      // If there was an error, send a 500 Internal Server Error response
      res.sendStatus(500);
    } else {
      // If the review was inserted successfully, check if the data was added to the database
      const sql =
        "SELECT * FROM reviews WHERE name = ? AND review = ? AND rating = ?";
      const params = [name, review, rating];
      conn.query(sql, params, (error, results) => {
        if (error) {
          console.error(error);
        } else {
          console.log(results);
          // check if the data in the results array matches the expected values
        }
      });
      // send a 200 OK response
      res.sendStatus(200);
    }
  });
});
app.get("/route", (req, res) => {
  res.send("Hello, world!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
