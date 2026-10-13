const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = getTaskFromInputBox();
    listContainer.appendChild(li);

    li.appendChild(getCross());
  }
  inputBox.value = "";
  saveData();
  function getTaskFromInputBox() {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    return li;
  }
  function getCross() {
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    return span;
  }
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    saveData();
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
  listContainer.innerHTML = localStorage.getItem("data");
}

loadData();
