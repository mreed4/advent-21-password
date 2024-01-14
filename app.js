const passwordInput = document.querySelector("#password");
const passwordLengthInput = document.querySelector("#length");
const passwordLengthSpan = document.querySelector("#lengthText");
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
const copyButton = document.querySelector(".copy");
const refreshButton = document.querySelector(".refresh");

const symbols = ["@", "#", "$", "%", "&", "=", "+", "?", "~"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const similar = ["i", "l", "1", "L", "o", "0", "O"];
let available = [...symbols, ...numbers, ...lowercase, ...uppercase];

(function init() {
  initEventListeners();
  console.log("Initial load", available);
  generatePassword();
  passwordLengthSpan.textContent = passwordLengthInput.value;
})();

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
    generatePassword();
    console.log("Removed", event.target.id, available);
  }

  if (event.target.checked) {
    enableGroup(event.target.id);
    generatePassword();
    console.log("Enabled", event.target.id, available);
  }
}

function handleCopy() {
  navigator.clipboard.writeText(passwordInput.value);
  console.log(`Copied "${passwordInput.value}" to clipboard`); // eslint-disable-line no-console
  copyButton.classList.add("copied");
  setTimeout(() => copyButton.classList.remove("copied"), 450);
}

function initEventListeners() {
  /* */
  // Checkboxes to enable/disable groups

  [...allCheckboxes].forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => handleCheckboxChange(event), false);
  });

  // Use slider to change password length

  passwordLengthInput.addEventListener("input", () => {
    passwordLengthSpan.textContent = passwordLengthInput.value;
    generatePassword();
  });

  // Click to copy and refresh

  copyButton.addEventListener("click", handleCopy);
  refreshButton.addEventListener("click", generatePassword);

  // Ctrl + C to copy and Alt + R/G/N to refresh

  document.addEventListener("keyup", (event) => {
    if (event.ctrlKey && event.key === "c") {
      handleCopy();
    }

    if (event.altKey && ["r", "g", "n"].includes(event.key.toLowerCase())) {
      generatePassword();
    }
  });

  // Alt + scroll to change password length

  document.addEventListener("mousewheel", (event) => {
    if (event.altKey) {
      const delta = Math.sign(event.deltaY);
      const newValue = parseInt(passwordLengthInput.value, 10) + delta;
      passwordLengthInput.value = newValue;
      passwordLengthSpan.textContent = newValue;
      generatePassword();
    }
  });
}

function generatePassword() {
  const length = passwordLengthInput.value;
  const password = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    password.push(available[randomIndex]);
  }

  passwordInput.value = password.join("");
}
