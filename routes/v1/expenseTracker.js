import express from "express";

const router = express.Router();

const expenses = [
  {
    id: 1,
    amount: 1000,
    details: "rent",
    type: "transfer",
    date: "26 / 5 / 2026",
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

    expenses.push(newExpense);
    res.status(201).json({
      success: true,
      message: "New expense succesfuly logged",
      data: newExpense,
    });
  });

router
  .route("/expense/:id")
  .get((req, res) => {
    const expenseId = parseInt(req.params.id, 10);
    const foundExpense = expenses.find((expense) => expense.id === expenseId);

    if (!foundExpense) {
      res.status(404).json({ message: "No expense with this Id available" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfuly fetched expense",
      data: foundExpense,
    });
  })
  .put((req, res) => {
    const expenseId = parseInt(req.params.id, 10);
    const foundExpense = expenses.find((expense) => expense.id === expenseId);

    if (!foundExpense) {
      res.status(404).json({ message: "No expense with this Id available" });
      return;
    }

    foundExpense.amount = req.body.amount;
    foundExpense.details = req.body.details;
    foundExpense.type = req.body.type;

    res.status(201).json({
      success: true,
      message: "successfully updated expense detail",
      data: foundExpense,
    });
  })
  .delete((req, res) => {
    const expenseId = parseInt(req.params.id, 10);
    const foundIndex = expenses.findIndex(
      (expense) => expense.id === expenseId,
    );

    if (foundIndex === -1) {
      res.status(404).json({ message: "No expense with this Id available" });
      return;
    }

    const deletedExpense = expenses.splice(foundIndex, 1)[0];
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: deletedExpense,
    });
  });

export default router;
