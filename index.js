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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    // editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-primary");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    // editBtn.setAttribute("type", "reset");
    deleteBtn.classList.add("btn", "btn-danger");
    incomeRevenuesList.appendChild(item);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
  });
}

incomeRevenuesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = event.target.revenueTitle.value;
  const newAmount = event.target.revenueAmount.value;

  incomesRevenues.push({
    title: newTitle,
    amount: Number(newAmount),
    id: Math.random(),
  });

  document.getElementById("revenues-form").reset();
  totalRevenues();

  renderIncomeRevenuesList();
});

function totalRevenues() {
  const total = incomesRevenues.reduce((prev, curr) => prev + curr.amount, 0);
  const revenueTotal = document.getElementById("revenue-sum");
  revenueTotal.textContent = `Suma przychodów = ${total} PLN`;
}
