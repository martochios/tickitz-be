const payModel = require("../models/pay.models");
const db = require("../database");

const pay = async (req, res) => {
  try {
    const { movie_id, payment_date, amount } = req.body;

    // Validasi input
    if (!(movie_id && payment_date && amount)) {
      return res.status(400).json({
        status: false,
        message: "Bad input, please provide all required fields",
      });
    }

    // Simpan data pembayaran ke database
    const payPayload = {
      movie_id,
      payment_date,
      amount,
      status: "unpaid ticket",
    };

    const payQuery = await payModel.createPayment(payPayload);

    return res.status(200).json({
      status: true,
      message: "Payment record created successfully",
      data: payQuery,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error in server",
    });
  }
};


const updatePaymentStatus = async (paymentId, newStatus) => {
  try {
    const query = await db`UPDATE pay SET status = ${newStatus} WHERE id = ${paymentId}`;
    return query;
  } catch (error) {
    return error;
  }
};

const updatePaymentStatusController = async (req, res) => {
  try {
    const { payment_id, new_status } = req.body;

    // Validasi input
    if (!(payment_id && new_status)) {
      return res.status(400).json({
        status: false,
        message: "Bad input, please provide all required fields",
      });
    }

   
    await updatePaymentStatus(payment_id, new_status);

    return res.status(200).json({
      status: true,
      message: "Payment status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error in server",
    });
  }
};

module.exports = {
  pay,
  updatePaymentStatusController,
};
