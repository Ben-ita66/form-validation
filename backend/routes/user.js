const express = require("express");
const routes = express.Router();
const { registerUser, getUsers } = require("../controllers/user");

routes.post("/register", registerUser);
routes.get("/users", getUsers);

module.exports = routes;
