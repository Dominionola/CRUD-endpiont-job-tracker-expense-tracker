import express from "express";

const router = express.Router();

const expenses = [
  {
    id: 1,
    amount: 1000,
    details: "rent",
    type: "transfer",
    date: 26 / 5 / 2026,
  },
];

router
  .route("/expense")
  .get((req, res) => {
    res
      .status(200)
      .json({ message: "Here is your record", success: true, data: expenses });
  })
  .post((req, res) => {
    const today = new Date();
    const newDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const newExpense = {
      id: expenses.length + 1,
      amount: req.body.amount,
      details: req.body.details,
      type: req.body.type,
      date: newDate,
    };

    res
      .status(200)
      .json({
        success: true,
        message: "New expense succesfuly logged",
        data: newExpense,
      });
  });

export default router;
