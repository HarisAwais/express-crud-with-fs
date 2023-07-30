const express = require("express");
const {engine} = require("express-handlebars");
const createUser = require("./controllers/createUsers");
const showUsers = require("./controllers/showUsers");
const updateUsers = require("./controllers/updateUsers");
const User = require("./userData.json"); // Load the user data from the JSON file.

const app = express();
const port = 8000;

// Middleware
app.use(express.json());

// Set up Handlebars engine
app.engine(".hbs", engine({ extname: ".hbs", defaultLayout: false, layoutsDir: "views" }));
app.set("view engine", ".hbs");

// Routes
app.post("/users", createUser);
app.get("/get-users", showUsers);
app.put("/update/:id", updateUsers);

// Custom error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (typeof err === "string") {
    return res.status(400).json({ Error: err });
  }

  return res.status(500).json({ error: "Something went wrong. Please try again later." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
