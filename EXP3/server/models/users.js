const bcrypt = require("bcryptjs");

// Pre-hashed passwords
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "Admin",
  },
  {
    id: 2,
    username: "editor",
    password: bcrypt.hashSync("editor123", 10),
    role: "Editor",
  },
  {
    id: 3,
    username: "viewer",
    password: bcrypt.hashSync("viewer123", 10),
    role: "Viewer",
  },
];

module.exports = users;