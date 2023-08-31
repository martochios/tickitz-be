const payModel = require("../models/pay.models");
const db = require("../database");

const pay = async (req, res) => {
  try {
    const { movie_id, payment_date, amount } = req.body;

    if (!(movie_id && payment_date && amount)) {
      return res.status(400).json({
        status: false,
        message: "Bad input, please provide all required fields",
      });
    }

    const payPayload = {
      movie_id,
      payment_date,
      amount,
      status: "Ticket in active",
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

const getPayment = async (req, res) => {
  try {

    const paymentId = req.params.paymentId;


    if (!paymentId) {
      return res.status(400).json({
        status: false,
        message: "Payment ID is required",
      });
    }


    const query = await db`SELECT * FROM pay WHERE id = ${paymentId}`;

    if (query.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Payment record not found",
      });
    }

    const paymentData = query[0];

    return res.status(200).json({
      status: true,
      message: "Payment record retrieved successfully",
      data: paymentData,
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
  getPayment,
};
