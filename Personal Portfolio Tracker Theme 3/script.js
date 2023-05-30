// Array to store the transactions
// let transactions = [];

// Function to retrieve transactions from localStorage
function getTransactionsFromStorage() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      transactions = JSON.parse(storedTransactions);
    }
    else{
        transactions=[];
    }
  }
  
  // Function to save transactions to localStorage
  function saveTransactionsToStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
  
// Function to calculate and update the balance
function updateBalance() {
    const balanceElement = document.getElementById('balance');
    const balance = transactions.reduce((total, transaction) => {
        return total + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
    console.log("updateBalance"+balance);
    balanceElement.textContent = balance.toFixed(2);
}

// Function to add a new transaction
function addTransaction(event) {
    event.preventDefault();

    const typeElement = document.getElementById('type');
    const descriptionElement = document.getElementById('description');
    const amountElement = document.getElementById('amount');

    const type = typeElement.value;
    const description = descriptionElement.value;
    const amount = parseFloat(amountElement.value);

    const transaction = { type, description, amount };
    
    // Add transaction to the array
  transactions.push(transaction);

  // Save transactions to localStorage
  saveTransactionsToStorage();
    // Reset form fields
    typeElement.value = 'income';
    descriptionElement.value = '';
    amountElement.value = '';

    updateTransactionList();
    updateBalance();
}

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);

    // Save transactions to localStorage
  saveTransactionsToStorage();
    updateTransactionList();
    
    updateBalance();
}

// Function to update the transaction list
function updateTransactionList() {
    const transactionList = document.getElementById('transaction-list');
  transactionList.innerHTML = '';

  transactions.forEach((transaction, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('flex', 'items-center', 'py-2', 'border-b');

    const typeLabel = document.createElement('label');
    typeLabel.innerText = transaction.type;
    typeLabel.classList.add('mr-4', 'text-sm', 'uppercase');
    if (transaction.type === 'income') {
      typeLabel.classList.add('text-green-500');
    } else {
      typeLabel.classList.add('text-red-500');
    }

    const descriptionText = document.createElement('span');
    descriptionText.innerText = transaction.description;
    descriptionText.classList.add('mr-2');

    const amountText = document.createElement('span');
    amountText.innerText = transaction.amount.toFixed(2);
    amountText.classList.add('font-bold');

    listItem.appendChild(typeLabel);
    listItem.appendChild(descriptionText);
    listItem.appendChild(amountText);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('ml-auto', 'btn-delete','bg-red-500', 'p-2','rounded');
    deleteButton.addEventListener('click', () => deleteTransaction(index));

    listItem.appendChild(deleteButton);
    transactionList.appendChild(listItem);
    });

    const rightDivision = document.getElementById('right-division');
  if (transactions.length > 0) {
    rightDivision.classList.remove('hidden');
  } else {
    rightDivision.classList.add('hidden');
  }
}

// Event listener for the transaction form submission
const transactionForm = document.getElementById('transaction-form');
transactionForm.addEventListener('submit', addTransaction);

// On page load, retrieve transactions from storage
getTransactionsFromStorage();

// Update transaction list on page load
// saveTransactionsToStorage();
updateTransactionList();
updateBalance();