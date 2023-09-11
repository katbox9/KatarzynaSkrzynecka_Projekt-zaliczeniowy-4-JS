// REVENUES
const incomeRevenuesForm = document.getElementById("revenues-form");
const incomeRevenuesList = document.getElementById("revenues-list");
const incomesRevenues = [];

function renderIncomeRevenuesList() {
  incomeRevenuesList.innerHTML = "";
  incomesRevenues.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} PLN`;
    item.classList.add("revenue-item");
    // item.setAttribute("id", "li-item");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-primary");

    editBtn.addEventListener("click", () => {
      const editModal = document.getElementById("edit-container");
      editModal.classList.remove("hidden");
      const editName = document.getElementById("edit-name-id");
      const editAmount = document.getElementById("edit-amount-id");
      editName.value = income.title;
      editAmount.value = income.amount;
      const cancelBtn = document.getElementById("cancel-btn");
      cancelBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });

      const saveBtn = document.getElementById("save-btn");
      saveBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    deleteBtn.setAttribute("type", "reset");
    deleteBtn.classList.add("btn", "btn-danger");

    deleteBtn.addEventListener("click", () => {
      const indexToDelete = incomesRevenues.findIndex(
        (item) => item.id === income.id
      );
      incomesRevenues.splice(indexToDelete, 1);

      totalRevenues();
      renderIncomeRevenuesList();
    });

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

// EXPENSES
const incomeExpensesForm = document.getElementById("expenses-form");
const incomeExpensesList = document.getElementById("expenses-list");
const incomesExpenses = [];

function renderIncomeExpensesList() {
  incomeExpensesList.innerHTML = "";
  incomesExpenses.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${income.amount} PLN`;
    item.classList.add("expense-item");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-primary");

    editBtn.addEventListener("click", () => {
      const editModal = document.getElementById("edit-container");
      editModal.classList.remove("hidden");
      const editName = document.getElementById("edit-name-id");
      const editAmount = document.getElementById("edit-amount-id");
      editName.value = income.title;
      editAmount.value = income.amount;
      const cancelBtn = document.getElementById("cancel-btn");
      cancelBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });

      const saveBtn = document.getElementById("save-btn");
      saveBtn.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Usuń";
    editBtn.setAttribute("type", "reset");
    deleteBtn.classList.add("btn", "btn-danger");

    deleteBtn.addEventListener("click", () => {
      const indexToDelete = incomesExpenses.findIndex(
        (item) => item.id === income.id
      );
      incomesExpenses.splice(indexToDelete, 1);

      totalExpenses();
      renderIncomeExpensesList();
    });

    incomeExpensesList.appendChild(item);
    item.appendChild(editBtn);
    item.appendChild(deleteBtn);
  });
}

incomeExpensesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTitle = event.target.expenseTitle.value;
  const newAmount = event.target.expenseAmount.value;

  incomesExpenses.push({
    title: newTitle,
    amount: Number(newAmount),
    id: Math.random(),
  });

  document.getElementById("expenses-form").reset();
  totalExpenses();
  renderIncomeExpensesList();
});

function totalExpenses() {
  const total = incomesExpenses.reduce((prev, curr) => prev + curr.amount, 0);
  const expenseTotal = document.getElementById("expenses-sum");
  expenseTotal.textContent = `Suma wydatków = ${total} PLN`;
}

// FINAL RESULT
function totalResult(totalRevenues, totalExpenses) {
  const total = totalRevenues - totalExpenses;
  const totalResult = document.getElementById("result-output");
  totalResult.textContent = `Możesz jeszcze wydać ${total} PLN`;
}
