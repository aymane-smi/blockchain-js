const express                          = require("express"),
      router                           = express.Router({mergeParams: true}),
      {Blockchain, Transaction, Mine}  = require("../controllers/index");

router.get("/blockchain", Blockchain);
router.post("/transaction", Transaction);
router.get("/mine", Mine);

module.exports = router;