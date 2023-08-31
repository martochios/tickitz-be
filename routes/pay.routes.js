const router = require("express").Router()
const payController = require('../controllers/pay.controller')

router.post("/pay", payController.pay);
router.post("/update_payment_status", payController.updatePaymentStatusController);
router.get("/payment/:paymentId", payController.getPayment);

module.exports = router;

