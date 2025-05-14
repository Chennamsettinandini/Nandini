const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const User = require('../db/user')
const router = express.Router();
router.post("/register", async (req, res) =>
{
  let model = req.body;
  if (model.name && model.email && model.password) {
    await registerUser(model);
    res.send({
      message: "User registered",
    });
  } else {
    res.status(400).json({
      error: "Please provide name , email and password",
    });
  }
});
//users data fetching
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch users." });
  }
});
//users data deleteing
router.delete("/users/:email", async (req, res) => {
  try {
    const  recieEmail = req.params;//ch
    const email=recieEmail.email;
    console.log(email);
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
});
router.post("/login", async (req, res) => 
{
  let model = req.body;
  if (model.email && model.password) {
    const result = await loginUser(model);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        error: "Email or password is incorrect",
      });
    }
  } else {
    res.status(400).json({
      error: "Please provide email and password",
    });
  }
});
router.post("/update",async (req, res) => 
{
  const { oldName, oldEmail, newName, newEmail } = req.body;
   console.log("receiving request",req.body);
   console.log("searching for user",oldEmail);
  const user = await User.findOne({ email: oldEmail }); 
  if (!user) {
    return res.status(404).json({ message: "User not found in database!" });
  }
 // Update user name and email if they are provided and different from the old values
  if (newName && newName !== oldName) {
    user.name = newName;
  }
  if (newEmail && newEmail !== oldEmail) {
    user.email = newEmail;
  }

  await user.save();
  res.json({ message: "Profile updated successfully!", user });
});

module.exports = router;
