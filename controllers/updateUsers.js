const fs = require("fs");
const dataFilePath = "./userData.json";

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let users = [];

  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    users = JSON.parse(data);

    const userToUpdate = users.find((user) => user.id.toString() === id);

    if (!userToUpdate) {
      throw new Error("Error! User not Found...!");
    }

    userToUpdate.name = name || userToUpdate.name; // If name is not provided, keep the existing name.
    userToUpdate.email = email || userToUpdate.email; // If email is not provided, keep the existing email.

    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");

    res.status(200).send({
      success: true,
      message: "User is updated successfully",
      user: userToUpdate,
    });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).send({
      success: false,
      message: "Error: Unable to update user data.",
    });
  }
};

module.exports = updateUser;