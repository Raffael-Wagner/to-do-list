const notes = document.querySelector("input");
const btnInsert = document.querySelector(".divInsert button");
const deleteAll = document.querySelector(".clear button");
const ul = document.querySelector("ul");

var itensDB = [];

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
  const text = notes.value;
  const date = document.querySelector(".dateInsert").value;

  if (text !== "" && date !== "") {
    setItemDB();
  } else {
    alert("A data é obrigatória!");
    document.querySelector(".dateInsert").classList.add("required");
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
      <span class="texto" data-si=${i}><input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />${text}</span>
      <span class="data">${date}</span>
      <button onclick="removeItem(${i})" data-i=${i}><img src="/assets/delete_button.svg" alt=""></button>
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
}

function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}

loadItens();
