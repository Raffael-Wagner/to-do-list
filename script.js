const notes = document.querySelector("input.textInsert");
const btnInsert = document.querySelector(".divInsert button");
const deleteAll = document.querySelector(".header button");
const ul = document.querySelector("ul");
const lives = document.querySelectorAll(".bx.bxs-heart");

var itensDB = [];
var livesCount = 5;

deleteAll.onclick = () => {
  itensDB = [];
  livesCount = 5;
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

  // Verifica se a data selecionada é anterior à data atual
  if (Date.parse(date) < Date.now()) {
    alert("Data selecionada é anterior à data atual. Você perdeu uma vida!");
    livesCount--;
    checkLives();
    if (livesCount <= 0) {
      alert("Suas vidas acabaram! Você perdeu o jogo.");
      location.reload();
      return;
    }
  }

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
  updateLives();
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

function checkLife(i) {
  const today = new Date();
  const itemDate = new Date(itensDB[i].date);
  const timeDiff = itemDate.getTime() - today.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (diffDays < 0 && itensDB[i].status !== "checked") {
    livesCount--;
    updateLives();
    if (livesCount === 0) {
      alert("Game over!");
    }
  }
}

function updateLives() {
  for (let i = 0; i < lives.length; i++) {
    if (i < livesCount) {
      lives[i].classList.add("active");
    } else {
      lives[i].classList.remove("active");
    }
  }
}

loadItens();
