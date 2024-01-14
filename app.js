const passwordInput = document.querySelector("#password");
const passwordLengthInput = document.querySelector("#length");
const passwordLengthSpan = document.querySelector("#lengthText");
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");

const symbols = ["@", "#", "$", "%", "&", "=", "+", "?", "~"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const similar = ["i", "l", "1", "L", "o", "0", "O"];
let available = [...symbols, ...numbers, ...lowercase, ...uppercase];

console.log("Initial load", available);

function removeGroup(checkboxId) {
  if (checkboxId === "symbols") {
    available = available.filter((char) => !symbols.includes(char));
  }
  if (checkboxId === "numbers") {
    available = available.filter((char) => !numbers.includes(char));
  }
  if (checkboxId === "lowercase") {
    available = available.filter((char) => !lowercase.includes(char));
  }
  if (checkboxId === "uppercase") {
    available = available.filter((char) => !uppercase.includes(char));
  }
  if (checkboxId === "similar") {
    available = available.filter((char) => !similar.includes(char));
  }
}

function enableGroup(checkboxId) {
  if (checkboxId === "symbols") {
    available = [...available, ...symbols];
  }
  if (checkboxId === "numbers") {
    available = [...available, ...numbers];
  }
  if (checkboxId === "lowercase") {
    available = [...available, ...lowercase];
  }
  if (checkboxId === "uppercase") {
    available = [...available, ...uppercase];
  }
  if (checkboxId === "similar") {
    available = [...available, ...similar];
  }
}

function handleCheckboxChange(event) {
  if (!event.target.checked) {
    removeGroup(event.target.id);
    console.log("Removed", event.target.id, available);
  }

  if (event.target.checked) {
    enableGroup(event.target.id);
    console.log("Enabled", event.target.id, available);
  }
}

function initEventListeners() {
  [...allCheckboxes].forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => handleCheckboxChange(event), false);
  });

  passwordLengthInput.addEventListener("change", () => {
    passwordLengthSpan.textContent = passwordLengthInput.value;
  });
}

(function init() {
  initEventListeners();
})();
