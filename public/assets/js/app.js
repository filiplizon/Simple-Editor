const editor = document.querySelector(".editor");
const tools = document.querySelector(".tools");
const openBtn = document.getElementById("open");
const openModalBtns = [
  document.querySelector(".save"),
  document.querySelector(".openBtn"),
];
const closeModalBtns = [
  document.getElementById("save"),
  document.getElementById("open"),
  document.querySelector(".close"),
];
const modal = document.querySelector(".modal-wrapper");
let isModalOpen = false;
let currentModal;
const titleInput = document.getElementById("fileName");
const hiddenInput = document.querySelector(".hidden-input");
const filesList = document.querySelector(".files-list");
let currentFile;

editor.focus();

const format = (command, value) => document.execCommand(command, false, value);

tools.addEventListener("click", e => {
  const formatType = e.target.closest("button").name;
  formatType && format(formatType);
});

const openModal = name => {
  currentModal = document.querySelector(`.${name}-modal`);
  name === "save" && (hiddenInput.value = editor.innerHTML);
  modal.classList.add("open");
  currentModal.style.display = "flex";
};

openModalBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (isModalOpen) {
      e.preventDefault();
    } else {
      isModalOpen = !isModalOpen;
      const currentModalName = e.target.name;
      openModal(currentModalName);
      document.body.classList.add("shadow");
    }
  });
});

const closeModal = () => {
  isModalOpen = !isModalOpen;
  modal.classList.remove("open");
  currentModal.removeAttribute("style");
  document.body.classList.remove("shadow");
};

closeModalBtns.forEach(btn => {
  btn.addEventListener("click", e => {
    if (titleInput.value === "" && !e.target.classList.contains("close")) {
      e.preventDefault();
    } else {
      closeModal();
    }
  });
});

const req = new XMLHttpRequest();
const url = "/read";

req.open("GET", url, true);
req.addEventListener("load", onLoad);
req.addEventListener("error", onError);
req.send();

function onLoad() {
  const response = this.responseText;
  const parsedResponse = JSON.parse(response);

  parsedResponse.files.forEach(({ name, text, date }) => {
    const li = document.createElement("li");
    li.className = "list-item";
    li.setAttribute("data-content", text);
    li.innerHTML = `<p>${name}</p><p>${date}</p>`;
    filesList.appendChild(li);
  });
}

function onError() {
  console.log("error receiving async AJAX call");
}

const setCurrentFile = e => {
  currentFile && currentFile.classList.remove("selected");
  currentFile = e.target.closest("li");
  currentFile && currentFile.classList.add("selected");
};

const openFile = e => {
  if (currentFile) {
    editor.innerHTML = currentFile.dataset.content;
    currentFile.classList.remove("selected");
    closeModal();
    currentFile = false;
  } else {
    e.preventDefault();
  }
};

filesList.addEventListener("click", setCurrentFile);

openBtn.addEventListener("click", e => openFile(e));
