const express                             = require("express"),
      router                              = express.Router({mergeParams: true}),
      {Transaction, TransactionBroadcast} = require("../controllers/index");

router.post("/", Transaction);
router.post("/broadcast", TransactionBroadcast);

module.exports = router;