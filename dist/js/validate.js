(() => {
  const fields = {
    name: "name",
    email: "email",
    phone: "phone",
    password: "password",
    passwordAccept: "password-accept",
    INN: "INN",
    KPP: "KPP",
    OGRN: "OGRN",
    subscribe: "subscribe",
    nameOrganization: "nameOrganization",
    privacy: "privacy",
    legalForm: "legal-form",
    address: "address",
    contactPerson: "contact-person"
  };
  const errorMessages = {
    ERROR_REQUIRED: "Обязательное поле",
    ERROR_EMAIL: "Введите корректный email",
    ERROR_PHONE: "Заполните телефон полностью",
    ERROR_PASSWORD_ACCEPT: "Пароли не совпадают",
    ERROR_MIN_LENGTH: (minLength) => {
      return `Поле должно содержать не менее ${minLength} символов`;
    },
    ERROR_MAX_LENGTH: (maxLength) => {
      return `Поле должно содержать не более ${maxLength} символов`;
    },
    ERROR_MIN_LENGTH_DATA: (minLength, fieldName) => {
      return `${fieldName} должно состоять из ${minLength} символов`;
    }
  };
  const errors = {
    [fields.name]: {
      valueMissing: errorMessages.ERROR_REQUIRED
    },
    [fields.email]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      typeMismatch: errorMessages.ERROR_EMAIL,
      customError: errorMessages.ERROR_EMAIL
    },
    [fields.phone]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      customError: errorMessages.ERROR_PHONE
    },
    [fields.password]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      tooShort: errorMessages.ERROR_MIN_LENGTH(6)
    },
    [fields.INN]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      tooShort: errorMessages.ERROR_MIN_LENGTH(10),
      tooLong: errorMessages.ERROR_MAX_LENGTH(12)
    },
    [fields.KPP]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      tooShort: errorMessages.ERROR_MIN_LENGTH_DATA(9, "КПП")
    },
    [fields.OGRN]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      tooShort: errorMessages.ERROR_MIN_LENGTH_DATA(13, "ОГРН")
    },
    [fields.nameOrganization]: {
      valueMissing: errorMessages.ERROR_REQUIRED
    },
    [fields.passwordAccept]: {
      valueMissing: errorMessages.ERROR_REQUIRED,
      customError: errorMessages.ERROR_PASSWORD_ACCEPT,
      tooShort: errorMessages.ERROR_MIN_LENGTH(6)
    },
    [fields.address]: {
      valueMissing: errorMessages.ERROR_REQUIRED
    },
    [fields.contactPerson]: {
      valueMissing: errorMessages.ERROR_REQUIRED
    }
    // [fields.subscribe]: {
    //     valueMissing: errorMessages.ERROR_REQUIRED
    // },
    // [fields.privacy]: {
    //     valueMissing: errorMessages.ERROR_REQUIRED
    // }
  };
  document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".js-form");
    forms == null ? void 0 : forms.forEach((el) => formValidate(el));
    checkFillInput();
    initMasks();
    displayPassword();
    initValidationInputs();
  });
  function initValidationInputs() {
    const inputs = document.querySelectorAll(".form-input input");
    const textarea = document.querySelectorAll(".form-textarea textarea");
    inputs.forEach((el) => {
      el.addEventListener("input", () => validateInput(el));
    });
    textarea.forEach((el) => {
      el.addEventListener("input", () => validateInput(el));
    });
  }
  function displayPassword() {
    var _a;
    const displayPassBtn = document.querySelector(".js-password-display");
    const passwordField = (_a = displayPassBtn == null ? void 0 : displayPassBtn.closest(".form-input")) == null ? void 0 : _a.querySelector("input");
    displayPassBtn == null ? void 0 : displayPassBtn.addEventListener("click", () => {
      displayPassBtn.classList.toggle("show-pass");
      const type = displayPassBtn.classList.contains("show-pass") ? "text" : "password";
      passwordField.setAttribute("type", type);
    });
  }
  function initMasks() {
    const phone = document.querySelector(`input[name=${fields.phone}]`);
    const kpp = document.querySelector(`input[name=${fields.KPP}]`);
    const ogrn = document.querySelector(`input[name=${fields.OGRN}]`);
    if (phone) {
      IMask(phone, {
        mask: "+7(000)000-00-00",
        prepare: (val, masked) => !masked.value && val === "8" ? "+7" : val
      });
    }
    if (kpp) {
      IMask(kpp, { mask: "000000000" });
    }
    if (ogrn) {
      IMask(ogrn, { mask: /^[15]\d{0,12}$/ });
    }
  }
  function checkFillInput() {
    const inputs = document.querySelectorAll(".form-input input");
    const textarea = document.querySelectorAll(".form-textarea textarea");
    inputs.forEach((el) => handleField(el, ".form-input"));
    textarea.forEach((el) => handleField(el, ".form-textarea"));
  }
  function handleField(el, parentClass) {
    el.addEventListener("change", () => {
      el.closest(parentClass).classList.toggle("fill", el.value.length);
    });
  }
  function formValidate(el) {
    el.addEventListener("submit", (e) => {
      e.preventDefault();
      checkValidationInput(el);
      if (el.checkValidity()) {
        if (el.classList.contains("js-recovery")) {
          showMessage(true, "Инструкции по восстановлению пароля отправлены на Ваш e-mail");
        }
        console.log("send");
        el.querySelector("[type=submit]").setAttribute("disabled", "disabled");
      } else {
        scrollToFirstError(el);
      }
    }, false);
  }
  function scrollToFirstError(el) {
    const firstError = el.querySelector("input:invalid");
    const posTop = firstError == null ? void 0 : firstError.getBoundingClientRect().top;
    scrollBy({ top: posTop - 100, behavior: "smooth" });
  }
  function checkValidationInput(context) {
    var _a;
    const excluded = [fields["OGRN"], fields["KPP"]];
    for (const i of context.elements) {
      if (i.getAttribute("required") !== null || excluded.includes(i.name) && !!i.value) {
        (_a = i.parentElement) == null ? void 0 : _a.classList.add("was-validated");
      }
      validateInput(i);
    }
  }
  function validateInput(input) {
    const nameField = input.getAttribute("name");
    const isNeedValidate = Object.keys(errors).includes(nameField);
    if (isNeedValidate) {
      customErrors(input, nameField);
      Object.keys(ValidityState.prototype).forEach((key) => {
        if (input.validity[key]) {
          const parent = input.closest(input.tagName === "TEXTAREA" ? ".form-textarea" : ".form-input");
          if (!parent.querySelector(".invalid-feedback")) {
            parent.insertAdjacentHTML("beforeend", '<div class="invalid-feedback"></div>');
          }
          const error = parent.querySelector(".invalid-feedback");
          error.textContent = errors[input.name][key];
        }
      });
    }
  }
  function customErrors(input, nameField) {
    if (nameField === fields.phone) {
      const isCorrectPhone = !input.validity.valueMissing && input.value.length < 16;
      input.setCustomValidity(isCorrectPhone ? "Incorrect phone" : "");
    } else if (nameField === fields.email) {
      const isCorrectEmail = !input.validity.valueMissing && !input.value.includes(".");
      input.setCustomValidity(isCorrectEmail ? "Incorrect email" : "");
    } else if (nameField === fields.passwordAccept) {
      const password = document.querySelector(`input[name=${fields.password}]`);
      const isCorrectPassword = !input.validity.valueMissing && input.value !== password.value;
      input.setCustomValidity(isCorrectPassword ? "Incorrect email" : "");
    }
  }
  function showMessage(success, customText = "") {
    const errorMessage = "Произошла ошибка передачи данных.<br> Пожалуйста поробуйте еще раз!";
    const successMessage = customText || "Данные успешно отправлены";
    const message = success ? successMessage : errorMessage;
    new Fancybox(
      [
        {
          src: `<p>${message}</p><button class="popup-close"></button>`,
          type: "html"
        }
      ],
      {
        mainClass: "send-message",
        closeButton: false,
        dragToClose: false,
        on: {
          done: (fancybox) => {
            closePopup(fancybox);
          }
        }
      }
    );
  }
  function closePopup(popup) {
    const closeBtn = document.querySelector(".popup-close");
    closeBtn.addEventListener("click", () => {
      popup.close();
      const submitButtons = document.querySelectorAll("[type=submit]");
      submitButtons.forEach((el) => el.removeAttribute("disabled"));
    });
  }
})();
