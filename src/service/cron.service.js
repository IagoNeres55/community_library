import cron from "node-cron";
import moment from "moment";
import sendEmail from "./email.service.js";
import loanRepository from "../repositories/loan.repositories.js";

cron.schedule("43 * * * *", async () => {
  console.log("running daily job to check for due dates...");

  const loans = await loanRepository.findAllLoanRepository();
  const today = moment().startOf("day");

  loans.forEach((loan) => {
    const dueDate = moment(loan.duedate).startOf("day");
    const reminderDate = moment(dueDate).subtract(1, "days");
    // isSame => compara a data
    if (today.isSame(reminderDate)) {
      sendEmail(loan.email,loan.username, loan.title, loan.duedate);
    }
  });
});
