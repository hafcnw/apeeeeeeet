document.addEventListener("DOMContentLoaded", function() {

    const submitForm = document.getElementById("bookSubmit");
    const editForm = document.getElementById("bookEdit");

    submitForm.addEventListener("click", function(event) {
        event.preventDefault();
        addBook();
        clearForm();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});
document.addEventListener("ondataloaded", () => {
    refreshDataFromList();
});

const checkType = document.getElementById("inputBookIsComplete");
checkType.addEventListener("click", () => {
    if (checkType.checked) {
        document.getElementById("typeBook").innerHTML = "Selesai dibaca";
        document.getElementById("typeBookEdit").innerHTML = "Selesai dibaca";
    } else {
        document.getElementById("typeBook").innerHTML = "Belum Selesai dibaca";
        document.getElementById("typeBookEdit").innerHTML = "Belum Selesai dibaca";
    }
});