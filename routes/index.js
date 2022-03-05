const express                          = require("express"),
      router                           = express.Router({mergeParams: true}),
      {Blockchain, Transaction, Mine, Register_n_Broadcast, RegisterNode, RegisterNodeBulk}
                                       = require("../controllers/index");

router.get("/blockchain", Blockchain);
router.post("/transaction", Transaction);
router.get("/mine", Mine);
router.post("/register-and-broadcast-node", Register_n_Broadcast);
router.post("/register-node", RegisterNode);
router.post("/register-nodes-bulk", RegisterNodeBulk);

module.exports = router;