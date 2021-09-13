const UNCOMPLETED_READING_LIST_ID = "incompleteBookshelfList";
const COMPLETED_READING_LIST_ID = "completeBookshelfList";
const BOOK_ID = "bookId";

function makeReadingList(bTitle, bWraiter, bYear, bTimestamp, isCompleted) {

    const bookTitle = document.createElement("h3");
    const title = document.createElement("span");
    title.classList.add("title_book");
    title.innerText = bTitle;
    bookTitle.append(title);

    const bookWriter = document.createElement("p");
    bookWriter.innerText = "Penulis : ";
    const writer = document.createElement("span");
    writer.classList.add("writer_book");
    writer.innerText = bWraiter;
    bookWriter.append(writer);

    const bookYear = document.createElement("p");
    bookYear.innerText = "Tahun Terbit : ";
    const year = document.createElement("span");
    year.classList.add("year_book");
    year.innerText = bYear;
    bookYear.append(year);

    const bookTimestamp = document.createElement("p");
    bookTimestamp.innerText = "Target Selesai : ";
    const timestamp = document.createElement("span");
    timestamp.classList.add("time_book");
    timestamp.innerText = bTimestamp;
    bookTimestamp.append(timestamp);

    const bookContainerInfo = document.createElement("div");
    bookContainerInfo.classList.add("info");
    bookContainerInfo.append(bookTitle, bookWriter, bookYear, bookTimestamp);

    const bookContainerAction = document.createElement("div");
    bookContainerAction.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(bookContainerInfo, bookContainerAction);

    if (isCompleted) {
        bookContainerAction.append(
            createEditButton(),
            createUndoButton(),
            createTrashButton()
        );
    } else {
        bookContainerAction.append(createEditButton(), createCheckButton(), createTrashButton());
    }

    return container;
}

function addBook() {
    const uncompletedReadingList = document.getElementById(UNCOMPLETED_READING_LIST_ID);
    const completedReadingList = document.getElementById(COMPLETED_READING_LIST_ID);
    const checkType = document.getElementById("inputBookIsComplete");

    const title = document.getElementById("inputBookTitle").value;
    const writer = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const timestamp = document.getElementById("inputTarget").value;
    if (!checkType.checked) {
        const readingList = makeReadingList(title, writer, year, timestamp, false);
        const bookObject = composeBookObject(title, writer, year, timestamp, false);

        readingList[BOOK_ID] = bookObject.id;
        list.push(bookObject);
        uncompletedReadingList.append(readingList);
    } else {
        const readingList = makeReadingList(title, writer, year, timestamp, true);
        const bookObject = composeBookObject(title, writer, year, timestamp, true);

        readingList[BOOK_ID] = bookObject.id;
        list.push(bookObject);
        completedReadingList.append(readingList);
    }
    updateDataToStorage();
}

function clearForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputTarget").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector(".title_book").innerText;
    const bookWriter = bookElement.querySelector(".writer_book").innerText;
    const bookYear = bookElement.querySelector(".year_book").innerText;
    const bookTimestamp = bookElement.querySelector(".time_book").innerText;

    const newBook = makeReadingList(bookTitle, bookWriter, bookYear, bookTimestamp, true);
    const listCompleted = document.getElementById(COMPLETED_READING_LIST_ID);
    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();
    updateDataToStorage();
}

function createCheckButton() {
    return createButton("checklist", function(event) {
        const parent = event.target.parentElement;
        addBookToCompleted(parent.parentElement);
    });
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ID]);
    list.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createTrashButton() {
    return createButton("trash", function(event) {
        const parent = event.target.parentElement;
        removeBookFromCompleted(parent.parentElement);
    });
}

function createUndoButton() {
    return createButton("undo", function(event) {
        const parent = event.target.parentElement;
        undoBookFromCompleted(parent.parentElement);
    });
}

function createEditButton() {
    return createButton("edit", function(event) {
        const parent = event.target.parentElement;
        editBookInfo(parent.parentElement);
    });
}

function undoBookFromCompleted(bookElement) {
    const bookTitle = bookElement.querySelector(".title_book").innerText;
    const bookWriter = bookElement.querySelector(".writer_book").innerText;
    const bookYear = bookElement.querySelector(".year_book").innerText;
    const bookTimestamp = bookElement.querySelector(".time_book").innerText;

    const newBook = makeReadingList(bookTitle, bookWriter, bookYear, bookTimestamp, false);
    const uncompletedReadingList = document.getElementById(UNCOMPLETED_READING_LIST_ID);

    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    uncompletedReadingList.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function editBookInfo(bookElement) {
    document.getElementById("bookSubmit").style.display = "none";
    const editButton = document.getElementById("bookEdit");
    editButton.style.display = "block";
    document.getElementById("inputBookTitle").value = bookElement.querySelector(".title_book").innerText;
    document.getElementById("inputBookAuthor").value = bookElement.querySelector(".writer_book").innerText;
    document.getElementById("inputBookYear").value = bookElement.querySelector(".year_book").innerText;
    document.getElementById("inputTarget").value = bookElement.querySelector(".time_book").innerText;

    editButton.addEventListener("click", function(event) {
        event.preventDefault();
        addEditedBook(bookElement);
    });
}

function addEditedBook(bookElement) {
    bookElement.remove();
    removeBookFromCompleted(bookElement);
    const uncompletedReadingList = document.getElementById(UNCOMPLETED_READING_LIST_ID);
    const completedReadingList = document.getElementById(COMPLETED_READING_LIST_ID);
    const checkType = document.getElementById("inputBookIsComplete");

    const title = document.getElementById("inputBookTitle").value;
    const writer = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const timestamp = document.getElementById("inputTarget").value;
    if (!checkType.checked) {
        const readingList = makeReadingList(title, writer, year, timestamp, false);
        const bookObject = composeBookObject(title, writer, year, timestamp, false);

        readingList[BOOK_ID] = bookObject.id;
        list.push(bookObject);
        uncompletedReadingList.append(readingList);
    } else {
        const readingList = makeReadingList(title, writer, year, timestamp, true);
        const bookObject = composeBookObject(title, writer, year, timestamp, true);

        readingList[BOOK_ID] = bookObject.id;
        list.push(bookObject);
        completedReadingList.append(readingList);
    }
    updateDataToStorage();
    clearForm();
    buttonReturn();
}

function buttonReturn() {
    document.getElementById("bookSubmit").style.display = "block";
    document.getElementById("bookEdit").style.display = "none";
}