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

async function findLoanByIdService(loanId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  if (!loan) throw new Error("Loan not of exists");
  return loan;
}

async function deleteLoanService(loanId, userId) {
  const loan = await loanRepositories.findLoanByIdRepository(loanId);
  if (!loan) throw new Error("Loan not found");

  if (loan.userId !== userId) throw new Error("Unauthorized");

  const deleteLoan = await loanRepositories.deleteLoanRepository(loanId);
  return deleteLoan;
}

export default {
  createLoanService,
  findAllLoanService,
  findLoanByIdService,
  deleteLoanService,
};
