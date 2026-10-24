// Entrar / criar conta em três passos (cada passo é um bloco de registration.html):
//   1) email
//   2) password — se já existe um utilizador com esse email
//   3) criar conta — se esse email não existe
// O botão submit é só um: o que faz depende do passo atual.
// Não há servidor: este formulário é uma simulação para treinar JavaScript.

// Utilizador de teste (a password é texto, porque tudo o que se escreve num <input> é texto)
const user = {
  name: "Mark",
  email: "mark@example.com",
  password: "1234567",
};

const form = document.querySelector("#registerForm");
const stepEmail = form.querySelector(".login-step-1");
const stepPassword = form.querySelector(".login-step-2");
const stepRegister = form.querySelector(".registration-section");
const message = form.querySelector("#formMessage");

let step = "email"; // "email" | "password" | "register"

// mostra o passo pedido e esconde os outros
function showStep(name) {
  step = name;
  stepEmail.classList.toggle("hidden", name !== "email");
  stepPassword.classList.toggle("hidden", name !== "password");
  stepRegister.classList.toggle("hidden", name !== "register");
}

// passo 1: este utilizador existe?
function checkEmail() {
  const email = form.querySelector("#emailVerification").value.trim().toLowerCase();

  if (!email) {
    message.textContent = "digita o teu email.";
  } else if (email === user.email) {
    form.querySelector("#welcomeName").textContent = user.name;
    showStep("password");
  } else {
    form.querySelector("#regEmail").value = email; // o email já foi escrito: não se pede outra vez
    showStep("register");
  }
}

// passo 2: a password está certa?
function checkPassword() {
  const password = form.querySelector("#loginPassword").value;

  if (password === user.password) {
    message.textContent = "bem-vindo de volta, " + user.name + "!";
  } else {
    message.textContent = "password errada.";
  }
}

// passo 3: criar a conta
function createAccount() {
  const name = form.querySelector("#regName").value.trim();
  const email = form.querySelector("#regEmail").value.trim();
  const password = form.querySelector("#regPassword").value;
  const confirmation = form.querySelector("#regPasswordConfirmation").value;

  if (!name || !email || !password) {
    message.textContent = "preenche todos os campos.";
  } else if (password !== confirmation) {
    message.textContent = "as passwords não coincidem.";
  } else {
    message.textContent = "conta criada, " + name + "!";
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // não deixa o browser recarregar a página
  message.textContent = "";

  if (step === "email") {
    checkEmail();
  } else if (step === "password") {
    checkPassword();
  } else {
    createAccount();
  }
});
