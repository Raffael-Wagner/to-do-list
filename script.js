/*Elementos do HTML */
const notes = document.querySelector("input.textInsert");
const btnInsert = document.querySelector(".divInsert button");
const deleteAll = document.querySelector(".clear button");
const ul = document.querySelector("ul");

/*Dados do jogo */
const maxItens = 20;
let livesCount = 5;
var itensDB = [];

/*LÓGICA DO JOGO E FUNÇÕES */
/*Botão clear para limpar todas as tarefas*/
deleteAll.onclick = () => {
  itensDB = [];
  livesCount = 5;
  updateDB();
  updateLivesImage();
};

notes.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && notes.value != "") {
    setItemDB();
  }
});

btnInsert.onclick = () => {
  const text = notes.value;
  const dateInput = document.querySelector(".dateInsert");
  const date = dateInput.value;

  const minDate = new Date(Date.now());
  const yyyy = minDate.getFullYear();
  const mm = String(minDate.getMonth() + 1).padStart(2, "0");
  const dd = String(minDate.getDate()).padStart(2, "0");
  const minDateString = `${yyyy}-${mm}-${dd}`;
  dateInput.setAttribute("min", minDateString);

  text !== "" && date !== "" && setItemDB();
  if (!date) {
    alert("A data é obrigatória!");
    dateInput.classList.add("required");
  }
};

function setItemDB() {
  if (itensDB.length >= maxItens) {
    alert(`Limite máximo de ${maxItens} itens atingido!`);
    return;
  }

  const date = document.querySelector(".dateInsert").value;

  if (Date.parse(date) < Date.now()) {
    alert("Data selecionada é anterior à data atual. Você perdeu uma vida!");
    livesCount--;
    updateLivesImage();
    if (livesCount <= 0) {
      alert("Suas vidas acabaram! Você perdeu o jogo.");
      deleteAll.click();
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

const today = new Date().toISOString().split("T")[0];
document.querySelector(".dateInsert").setAttribute("min", today);

function loadItens() {
  const today = new Date().toISOString().split("T")[0];
  document.querySelector(".dateInsert").setAttribute("min", today);
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem("todolist")) ?? [];
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, item.date, i);
  });
  updateLivesImage();
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
    if (livesCount < 5) {
      livesCount++;
    } else {
      alert("Você já atingiu o limite máximo de vidas!");
      return;
    }
    itensDB[i].status = "checked";
  } else {
    itensDB[i].status = "";
  }
  updateDB();
  updateLivesImage();
}

function removeItem(i) {
  itensDB.splice(i, 1);
  updateDB();
}

/*Função de mudar a imagem quando perder vida */
function updateLivesImage() {
  const lives = document.querySelector(".lives");
  lives.innerHTML = "";
  for (let i = 0; i < livesCount; i++) {
    const img = document.createElement("img");
    img.src = "/assets/heart_logo.svg";
    lives.appendChild(img);
  }
  for (let i = 0; i < 5 - livesCount; i++) {
    const img = document.createElement("img");
    img.src = "/assets/heart_gray.png";
    lives.appendChild(img);
  }
}

/*Modo dark */
const heartLogo = document.querySelector(".heart-logo");
const body = document.querySelector("body");
const header = document.querySelector("header");
const all = document.querySelector("*");

heartLogo.addEventListener("click", function () {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    header.classList.remove("dark");
    heartLogo.classList.remove("dark");
    all.classList.remove("dark");
  } else {
    body.classList.add("dark");
    header.classList.add("dark");
    heartLogo.classList.add("dark");
    all.classList.add("dark");
  }
});

loadItens();
