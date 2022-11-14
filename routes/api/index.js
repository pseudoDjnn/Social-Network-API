const router = require("express").Router();
const userApi = require("./user-routes");
// const thoughtApi = require("./thought-routes");

router.use("/users", userApi);
// router.use("/thoughts", thoughtApi);

module.exports = router;
