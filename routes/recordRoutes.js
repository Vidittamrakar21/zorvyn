const router2 = require("express").Router();
const rec = require("../controllers/recordController");
const auth2 = require("../middleware/auth");
const authorize2 = require("../middleware/authorize");

router2.post("/", auth2, authorize2("admin"), rec.createRecord);
router2.get("/", auth2, authorize2("admin", "analyst"), rec.getRecords);
router2.patch("/:id", auth2, authorize2("admin"), rec.updateRecord);
router2.delete("/:id", auth2, authorize2("admin"), rec.deleteRecord);

module.exports = router2;