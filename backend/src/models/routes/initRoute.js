const express = require("express");
const router = express.Router();


router.get("/init", (req, res) => {
  res.status(200).send("API is working!");
});

module.exports = router;
