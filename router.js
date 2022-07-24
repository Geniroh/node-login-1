const express = require("express");
const router = express.Router();

const credential = {
  email: "test@test.com",
  password: "12345",
};

//login user
router.post("/login", (req, res) => {
  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    // res.end("Login successful");
    res.redirect("/route/dashboard");
  } else {
    res.end("Invalid user");
    console.log(req.body.password);
  }
});

//route for dashboard
router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", {
      user: req.session.user,
    });
  } else {
    res.send("Unauthorized User");
  }
});

//route for logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("base", { title: "Express", logout: "Logout successful" });
    }
  });
});

module.exports = router;
