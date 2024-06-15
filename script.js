// Получаем элементы из HTML-документа
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// Определяем наборов символов, используемых для генерации пароля
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

// Функция для генерации пароля
const generatePassword = () => {
  let staticPassword = "", // Используемые символы для генерации пароля на основе выбранных опций
    randomPassword = "", // Сгенерированный пароль
    excludeDuplicate = false, // Исключаем повторение символов
    passLength = lengthSlider.value; // Длина пароля, указанная пользователем

   // Перебираем все опции и формируем строку символов для генерации
    options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // Генерируем пароль на основе выбранных опций и длины
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  // Выводим сгенерированный пароль в поле ввода
  passwordInput.value = randomPassword;  
};

// Функция для обновления индикатора сложности пароля
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

// Функция для обновления ползунка и генерации пароля при его изменении
const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword(); // Генерируем новый пароль
  updatePassIndicator(); // Обновляем индикатор сложности пароля
};
updateSlider(); // Вызываем обновление ползунка и генерации пароля при загрузке страницы

// Обработчик для копирования сгенерированного пароля в буфер обмена
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

// Добавляем обработчики событий для кнопок и ползунка
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);