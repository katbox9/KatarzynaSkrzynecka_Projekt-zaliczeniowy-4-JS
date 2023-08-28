const incomeRevenuesForm = document.getElementById("revenues-form");
const incomeRevenuesList = document.getElementById("revenues-list");
const incomesRevenues = [];

// const incomeExpensesForm = document.getElementById("expenses-form");
// const incomeExpensesList = document.getElementById("expenses-list");
// const incomesExpenses = [];

function renderIncomeRevenuesList() {
  incomeRevenuesList.innerHTML = "";
  incomesRevenues.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} PLN`;
    incomeRevenuesList.appendChild(item);
  });
}

incomeRevenuesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = event.target.revenueTitle.value;
  const newAmount = event.target.revenueAmount.value;

  incomesRevenues.push({
    title: newTitle,
    amount: newAmount,
    id: Math.random(),
  });

  renderIncomeRevenuesList();
});
