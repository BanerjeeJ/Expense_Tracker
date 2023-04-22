const balance = document.getElementById("Balance");
const money_add = document.getElementById("money-add");
const money_deduct = document.getElementById("money-deduct");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("Amount");

/*const localStorageTransactions = JSON.parse(
  localStorage.getItem("Transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];*/

let transactions = [];

//Add transactions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter Text and amount given below");
  } else {
    const transaction = {
      id: getTransactionID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    // updateLocalStorage();
    updatevalue();
    text.value = "";
    amount.value = "";
  }
}
//Generating transaction id
function getTransactionID() {
  return Math.floor(Math.random() * 100);
}

//Adding transactions to the DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Adding class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span>${sign}${Math.abs(
    transaction.amount
  )}</span>
    `;

  list.appendChild(item);
}

//Update values
function updatevalue() {
  const amount = transactions.map((transaction) => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amount.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_add.innerText = `$${income}`;
  money_deduct.innerText = `$${expense}`;
}

//Update LocalStorage
/*function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}*/

//Initialise
function Init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updatevalue();
}

Init();

form.addEventListener("submit", addTransaction);
