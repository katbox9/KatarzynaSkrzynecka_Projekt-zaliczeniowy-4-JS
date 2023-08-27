const incomeRevenuesForm = document.getElementById("revenues-form");
const incomeRevenuesList = document.getElementById("revenues-list");
const incomesRevenues = [];

// const incomeExpensesForm = document.getElementById("expenses-form");
// const incomeExpensesList = document.getElementById("expenses-list");
// const incomesExpenses = [];

incomeRevenuesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newName = event.target.revenueName.value;
  const newAmount = event.target.revenueAmount.value;

  incomesRevenues.push({
    name: newName,
    amount: newAmount,
    id: Math.random(),
  });

  renderIncomeRevenuesList();
});
