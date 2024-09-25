import loanService from "../service/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createLoan = await loanService.createLoanService(
      userId,
      bookId,
      dueDate
    );
    return res.status(201).send(createLoan);
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function findAllLoanController(req, res) {
  try {
    const loans = await loanService.findAllLoanService();
    return res.send(loans);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

async function findLoanByIdController(req, res) {
  const loanId = req.params.id;

  try {
    const loan = await loanService.findLoanByIdService(loanId);
    return res.send(loan);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

async function deleteLoanController(req, res) {
  const loanId = req.params.id;
  const userId = req.userId;

  try {
    const loan = await loanService.deleteLoanService(loanId, userId);
    return res.send(loan);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

export default {
  createLoanController,
  findAllLoanController,
  findLoanByIdController,
  deleteLoanController,
};
