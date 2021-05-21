//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");

  //create tr element
  const row = document.createElement("tr");

  //insert columns
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
    `;
  //Append row to the table
  list.appendChild(row);
};

//delete book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

//Clear fields after adding
UI.prototype.clearFields = function (book) {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Show error
UI.prototype.showAlert = function (message, className) {
  //create element
  const div = document.createElement("div");
  //add classes to div
  div.className = `alert ${className}`;
  //add text to div
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");

  const form = document.getElementById("book-form");

  //Insert Alert
  container.insertBefore(div, form);

  //Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  isbn = document.getElementById("isbn").value;

  //instatiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI object
  const ui = new UI();

  //validate if title or author or isbn are empty
  if (title === "" || author === "" || isbn === "") {
    //Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert("Book Added to the Book List", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  ui = new UI();

  if (e.target.className === "delete") {
    ui.deleteBook(e.target);
    //Show Message
    ui.showAlert("Book Removed", "success");
  }

  e.preventDefault();
});