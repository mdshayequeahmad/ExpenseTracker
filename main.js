// Lists Class: Represents a Lists
class Lists {
  constructor(amount, description, category) {
    this.amount = amount;
    this.description = description;
    this.category = category;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayLists() {
    const lists = Store.getLists();

    lists.forEach((lis) => UI.addExpenseToList(lis));
  }

  static addExpenseToList(lis) {
    const list = document.querySelector("#expenseList");

    const row = document.createElement("ul");

    row.innerHTML = `
        <li>${lis.amount}  --  
        ${lis.description}  --  
        ${lis.category}  --  
        <button class="edit">Edit</button>
        <button class="delete">Delete</button></li>
      `;

    list.appendChild(row);
  }

  static deleteList(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#amount").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#category").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getLists() {
    let lists;
    if (localStorage.getItem("lists") === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem("lists"));
    }

    return lists;
  }

  static addList(lis) {
    const lists = Store.getLists();
    lists.push(lis);
    localStorage.setItem("lists", JSON.stringify(lists));
  }

  static removeList(is) {
    const lists = Store.getLists();

    lists.forEach((lis, index) => {
      if (lis.is === is) {
        lists.splice(index, 1);
      }
    });

    localStorage.setItem("lists", JSON.stringify(lists));
  }
}

// Event: Display lists
document.addEventListener("DOMContentLoaded", UI.displayLists);

// Event: Add a lists
document.querySelector("#expenseForm").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const amount = document.querySelector("#amount").value;
  const description = document.querySelector("#description").value;
  const category = document.querySelector("#category").value;

  // Instatiate lists
  const lists = new Lists(amount, description, category);

  // Add List to UI
  UI.addExpenseToList(lists);

  // Add List to store
  Store.addList(lists);

  // Clear fields
  UI.clearFields();
});

// Event: Remove a List
document.querySelector("#expenseList").addEventListener("click", (e) => {
  // Remove List from UI
  UI.deleteList(e.target);

  // Remove List from store
  Store.removeList(e.target.parentElement.previousElementSibling.textContent);
});
