var router = require("express").Router();
var fetchRoutes = require("./fetch");
var articleRoutes = require("./articles");
var commentRoutes = require("./comments");
var clearRoutes = require("./clear");

router.use("/fetch", fetchRoutes);
router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/clear", clearRoutes);

module.exports = router;