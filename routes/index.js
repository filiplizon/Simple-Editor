const express = require("express");
const router = express.Router();

const PagesController = require("../controllers/PagesController");
const ApplicationController = require("../controllers/ApplicationController");

router.get("/", PagesController.home);

router.get("/read", ApplicationController.read);

router.post("/save", ApplicationController.save);

module.exports = router;
