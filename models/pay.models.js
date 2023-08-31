const db = require("../database")

const createPayment = async (payload) => {
  try {
    const query = await db`INSERT INTO pay ${db(
      payload,
      "movie_id",
      "payment_date",
      "amount",
      "status"
    )} returning *`;
    return query;
  } catch (error) {
    return error;
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

module.exports = {
  createPayment,
  updatePaymentStatus,
};
