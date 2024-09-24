import loanRepositories from "../repositories/loan.repositories.js";

async function createLoanService(userId, bookId, dueDate) {
  const createdLoan = await loanRepositories.createLoanRepository(
    userId,
    bookId,
    dueDate
  );
  if (!createdLoan) throw new Error("Error Creating Loan");
  return createdLoan;
}

async function findAllLoanService() {
  const loans = await loanRepositories.findAllLoanRepository();
  return loans;
}

export default { createLoanService, findAllLoanService };
