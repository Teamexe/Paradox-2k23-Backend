const { Router } = require("express");
const { homePage } = require("../controllers/homePage.controller");

const router = Router;

router.post("/home", homePage);

module.exports = router;
