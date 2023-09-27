// REVENUES
const incomeRevenuesForm = document.getElementById("revenues-form");
const incomeRevenuesList = document.getElementById("revenues-list");
const incomesRevenues = [];
const editForm = document.getElementById("edit-form");
const editModal = document.getElementById("edit-container");
const editName = document.getElementById("edit-name-id");
const editAmount = document.getElementById("edit-amount-id");
const cancelBtn = document.getElementById("cancel-btn");

function renderIncomeRevenuesList() {
  incomeRevenuesList.innerHTML = "";
  incomesRevenues.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${Number(income.amount).toFixed(
      2
    )} PLN`;
    item.classList.add("revenue-item");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-primary");

    editBtn.addEventListener("click", () => handleEditItem("revenue", income));

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

const handleEditItem = (actionType, changedItem) => {
  editForm.dataset.type = actionType;
  editForm.dataset.id = changedItem.id;

  editModal.classList.remove("hidden");

  editName.value = changedItem.title;
  editAmount.value = changedItem.amount;

  cancelBtn.addEventListener("click", () => {
    editModal.classList.add("hidden");
  });
};

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = Number(event.target.dataset.id);
  const type = event.target.dataset.type;
  const isRevenue = type === "revenue";
  const changedData = isRevenue ? incomesRevenues : incomesExpenses;

  editModal.classList.add("hidden");
  const itemToEdit = changedData.find((item) => item.id === id);
  const newTitle = event.target.editTitle.value;
  const newAmount = event.target.editAmount.value;

  itemToEdit.title = newTitle;
  itemToEdit.amount = Number(newAmount);

  isRevenue ? updateRevenuesData() : updateExpensesData();
});

const updateRevenuesData = () => {
  totalRevenues();
  renderIncomeRevenuesList();
};

const updateExpensesData = () => {
  totalExpenses();
  renderIncomeExpensesList();
};

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
  const roundedRevenuesTotal = total.toFixed(2);
  const revenueTotal = document.getElementById("revenue-sum");
  revenueTotal.textContent = `Suma przychodów = ${roundedRevenuesTotal} PLN`;
  totalResult();
}

// EXPENSES
const incomeExpensesForm = document.getElementById("expenses-form");
const incomeExpensesList = document.getElementById("expenses-list");
const incomesExpenses = [];

function renderIncomeExpensesList() {
  incomeExpensesList.innerHTML = "";
  incomesExpenses.forEach((income) => {
    const item = document.createElement("li");
    item.textContent = `${income.title}: ${Number(income.amount).toFixed(
      2
    )} PLN`;
    item.classList.add("expense-item");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edytuj";
    editBtn.setAttribute("type", "button");
    editBtn.classList.add("btn", "btn-primary");

    editBtn.addEventListener("click", () => handleEditItem("expense", income));

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
  const roundedExpenseTotal = total.toFixed(2);
  const expenseTotal = document.getElementById("expenses-sum");
  expenseTotal.textContent = `Suma wydatków = ${roundedExpenseTotal} PLN`;
  totalResult();
}

// FINAL RESULT
function totalResult() {
  const totalExpenses = incomesExpenses.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  const totalRevenues = incomesRevenues.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );
  const total = totalRevenues - totalExpenses;
  const roundedTotal = total.toFixed(2);
  const totalResult = document.getElementById("result-output");
  if (roundedTotal > 0) {
    return (totalResult.textContent = `Możesz jeszcze wydać ${roundedTotal} PLN.`);
  }
  if (roundedTotal < 0) {
    return (totalResult.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      roundedTotal
    )} PLN.`);
  }
  return (totalResult.textContent = `Bilans wynosi zero.`);
}
