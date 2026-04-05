const router3 = require("express").Router();
const dash = require("../controllers/dashboardController");
const auth3 = require("../middleware/auth");

router3.get("/summary", auth3, dash.getSummary);
module.exports = router3;