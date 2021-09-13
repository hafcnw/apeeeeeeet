const STORAGE_KEY = "READING_LIST";

let list = [];

function isStorageExist() {
    if (typeof(Storage) === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null)
        list = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist())
        saveData();
}

function composeBookObject(title, writer, year, timestamp, isCompleted) {
    return {
        id: +new Date(),
        title,
        writer,
        year,
        timestamp,
        isCompleted
    };
}

function findBook(bookId) {
    for (book of list) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of list) {
        if (book.id === bookId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromList() {
    const listUncompleted = document.getElementById(UNCOMPLETED_READING_LIST_ID);
    let listCompleted = document.getElementById(COMPLETED_READING_LIST_ID);


    for (book of list) {
        const newBook = makeReadingList(book.title, book.writer, book.year, book.timestamp, book.isCompleted);
        newBook[BOOK_ID] = book.id;


        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}