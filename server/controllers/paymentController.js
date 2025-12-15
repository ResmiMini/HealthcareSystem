const Payment = require("../models/Payment");

exports.savePayment = async (req, res) => {
  try {
    const { appointmentId, patientId, amount } = req.body;

    const payment = new Payment({
      appointmentId,
      patientId,
      amount,
      status: "Success"
    });

    await payment.save();

    res.status(201).json({
      message: "Payment saved successfully",
      payment
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
