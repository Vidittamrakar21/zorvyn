const router = require("express").Router();
const ctrl = require("../controllers/userController");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

router.post("/login", ctrl.login);
router.post("/", ctrl.createUser);
router.get("/", auth, authorize("admin"), ctrl.getUsers);
router.patch("/:id", auth, authorize("admin"), ctrl.updateUser);

module.exports = router;