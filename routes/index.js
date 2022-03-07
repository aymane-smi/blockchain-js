const express                          = require("express"),
      router                           = express.Router({mergeParams: true}),
      {Blockchain, Mine, Register_n_Broadcast, RegisterNode, RegisterNodeBulk, ReceiveBlock}
                                       = require("../controllers/index");

router.get("/blockchain", Blockchain);
router.get("/mine", Mine);
router.post("/register-and-broadcast-node", Register_n_Broadcast);
router.post("/register-node", RegisterNode);
router.post("/register-nodes-bulk", RegisterNodeBulk);
router.post("/receive-new-block", ReceiveBlock);

module.exports = router;