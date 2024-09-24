import loanService from "../service/loan.service.js";

async function createLoanController(req, res) {
  const { bookId, dueDate } = req.body;
  const userId = req.userId;

  try {
    const createLoan = await loanService.createLoanService(
      bookId,
      userId,
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
    return res.status(404).send(err.massage);
  }
}

export default { createLoanController, findAllLoanController };
