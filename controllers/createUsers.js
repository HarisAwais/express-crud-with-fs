const fs = require('fs');

const createUser = (req, res) => {
  try {
    const { id, name, email } = req.body;
    let users = [];

    if (!id || isNaN(id)) {
      throw new Error("Invalid input: ID must be a numeric value.");
    }

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      throw new Error("Invalid input: Name must be a non-empty string.");
    }

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      throw new Error("Invalid input: Email must not be empty.");
    }

    const dataFilePath = "userData.json";
    const data = fs.existsSync(dataFilePath) ? fs.readFileSync(dataFilePath, "utf-8") : "[]";
    users = JSON.parse(data);

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error("Email already exists. Please use a different email.");
    }

    users.push({ id, name, email });

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");

    res.status(201).send({
      success: true,
      message: "User created successfully",
      users,
    });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = createUser;