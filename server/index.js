const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const SECRET = "secret";

app.use(cors({
  origin: "https://ces-ctf-1.onrender.com",
  credentials: true
}));
app.use(cookieParser());


app.get("/login", (req, res) => {
  const token = jwt.sign(
    { username: "user", role: "user" },
    SECRET
  );

  res.json({
    message: "Logged in as user",
    token: token
  });
});


app.get("/admin", (req, res) => {
  const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(401).send("No token found");
}

const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token found");
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    if (decoded.role === "admin") {
      return res.send("FLAG:ZmxhZ0NFU3tIZXJlX2lzX3lvdXJfZmxhZ30K");
    } else {
      return res.send("Access Denied");
    }
  } catch {
    return res.status(401).send("Invalid token");
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
