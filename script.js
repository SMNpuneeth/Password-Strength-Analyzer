const passwordInput = document.getElementById("password");
const container = document.querySelector(".container");
const rulesOverlay = document.querySelector(".rulesOverlay ul");
const showToggle = document.querySelector(".show");
const strengthText = document.getElementById("strengthText");
const themeSwitch = document.getElementById("theme-switch");
const body = document.body;

// Password rules and messages
const rules = [
  {
    test: (pw) => pw.length >= 8,
    message: "Minimum 8 characters"
  },
  {
    test: (pw) => /[A-Z]/.test(pw),
    message: "At least 1 uppercase letter"
  },
  {
    test: (pw) => /[a-z]/.test(pw),
    message: "At least 1 lowercase letter"
  },
  {
    test: (pw) => /\d/.test(pw),
    message: "At least 1 number"
  },
  {
    test: (pw) => /[\W_]/.test(pw),
    message: "At least 1 special character (!@#$%^&*)"
  }
];

// Create the interactive rule list once
function initializeRulesUI() {
  rulesOverlay.innerHTML = "";
  rules.forEach((rule, index) => {
    const li = document.createElement("li");
    li.innerHTML = `✦ ${rule.message}`;
    li.setAttribute("data-index", index);
    li.classList.add("rule");
    rulesOverlay.appendChild(li);
  });
}

initializeRulesUI();

// Theme toggle functionality
themeSwitch.addEventListener('change', function() {
  if (this.checked) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
});

function checkStrength() {
  const value = passwordInput.value;
  let strength = 0;

  rules.forEach((rule, i) => {
    const li = document.querySelector(`li[data-index="${i}"]`);
    if (rule.test(value)) {
      li.classList.add("passed");
      li.innerHTML = `✅ ${rule.message}`;
      strength++;
    } else {
      li.classList.remove("passed");
      li.innerHTML = `✦ ${rule.message}`;
    }
  });

  container.classList.remove("weak", "moderate", "strong");

  let label = "";
  if (strength <= 2) {
    container.classList.add("weak");
    label = "Gotta go";
  } else if (strength === 3 || strength === 4) {
    container.classList.add("moderate");
    label = "Almost there";
  } else if (strength === 5) {
    container.classList.add("strong");
    label = "That's it, you are Genius";
  }

  strengthText.textContent = label;
}

function togglePassword() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showToggle.classList.add("hide");
  } else {
    passwordInput.type = "password";
    showToggle.classList.remove("hide");
  }
}
