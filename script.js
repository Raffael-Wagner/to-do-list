const notes = document.querySelector("input");
const btnInsert = document.querySelector(".divInsert button");
const deleteAll = document.querySelector(".header button");
const ul = document.querySelector("ul");
const lives = document.querySelectorAll(".bx.bxs-heart");

var itensDB = [];
var livesCount = 5;

deleteAll.onclick = () => {
  itensDB = [];
  updateDB();
};

notes.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && notes.value != "") {
    setItemDB();
  }
});

btnInsert.onclick = () => {
  if (notes.value != "") {
    setItemDB();
  }
};

function setItemDB() {
  if (itensDB.length >= 20) {
    alert("Limite máximo de 20 itens atingido!");
    return;
  }

  const date = document.querySelector(".dateInsert").value;

  itensDB.push({ item: notes.value, status: "", date: date });
  updateDB();
}

function updateDB() {
  localStorage.setItem("todolist", JSON.stringify(itensDB));
  loadItens();
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem("todolist")) ?? [];
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, item.date, i);
  });
}

function insertItemTela(text, status, date, i) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <span class="date">${date}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `;
  ul.appendChild(li);

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add("line-through");
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove("line-through");
  }

  notes.value = "";
  document.querySelector(".dateInsert").value = "";
}

function done(chk, i) {
  if (chk.checked) {
    itensDB[i].status = "checked";
  } else {
    itensDB[i].status = "";
  }

  updateDB();
  checkLife(i);
}

function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}

loadItens();
