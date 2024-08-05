document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("nickname");
  const userIdInput = document.getElementById("user_id");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const password2Input = document.getElementById("password2");
  const submitButton = document.getElementById("submit");

  // 닉네임 유효성 검사
  const validateNickname = () => {
    const value = nicknameInput.value;
    const box = nicknameInput.parentElement;
    const validImg = box.querySelector(".valid");
    const invalidImg = box.querySelector(".invalid");

    if (value === "") {
      validImg.style.display = "none";
      invalidImg.style.display = "none";
    } else {
      const isValid = /^[가-힣a-zA-Z0-9]{1,10}$/.test(value);
      validImg.style.display = isValid ? "inline" : "none";
      invalidImg.style.display = isValid ? "none" : "inline";
    }

    checkFormValidity();
  };

  // 아이디 유효성 검사
  const validateUserId = () => {
    const value = userIdInput.value;
    const box = userIdInput.parentElement;
    const validImg = box.querySelector(".valid");
    const invalidImg = box.querySelector(".invalid");

    if (value === "") {
      validImg.style.display = "none";
      invalidImg.style.display = "none";
    } else {
      const isValid = /^[가-힣a-zA-Z0-9]{6,10}$/.test(value);
      validImg.style.display = isValid ? "inline" : "none";
      invalidImg.style.display = isValid ? "none" : "inline";
    }

    checkFormValidity();
  };

  // 이메일 유효성 검사
  const validateEmail = () => {
    const value = emailInput.value;
    const box = emailInput.parentElement;
    const validImg = box.querySelector(".valid");
    const invalidImg = box.querySelector(".invalid");

    if (value === "") {
      validImg.style.display = "none";
      invalidImg.style.display = "none";
    } else {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      validImg.style.display = isValid ? "inline" : "none";
      invalidImg.style.display = isValid ? "none" : "inline";
    }

    checkFormValidity();
  };

  // 비밀번호 유효성 검사
  const validatePassword = () => {
    const password = passwordInput.value;
    const box = passwordInput.parentElement;
    const validImg = box.querySelector(".valid");
    const invalidImg = box.querySelector(".invalid");

    const isValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

    if (password === "") {
      validImg.style.display = "none";
      invalidImg.style.display = "none";
    } else {
      validImg.style.display = isValid ? "inline" : "none";
      invalidImg.style.display = isValid ? "none" : "inline";
    }

    validatePassword2(); // 비밀번호 확인 칸도 업데이트
    checkFormValidity();
  };

  // 비밀번호 확인 유효성 검사
  const validatePassword2 = () => {
    const password = passwordInput.value;
    const password2 = password2Input.value;
    const box = password2Input.parentElement;
    const validImg = box.querySelector(".valid");
    const invalidImg = box.querySelector(".invalid");

    if (password2 === "") {
      validImg.style.display = "none";
      invalidImg.style.display = "none";
    } else {
      const isValid = password === password2;
      validImg.style.display = isValid ? "inline" : "none";
      invalidImg.style.display = isValid ? "none" : "inline";
    }

    checkFormValidity();
  };

  // 폼 유효성 검사
  const checkFormValidity = () => {
    const isNicknameValid = /^[가-힣a-zA-Z0-9]{1,10}$/.test(nicknameInput.value);
    const isUserIdValid = /^[가-힣a-zA-Z0-9]{6,10}$/.test(userIdInput.value);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value);
    const isPassword2Valid = passwordInput.value === password2Input.value;

    if (isNicknameValid && isUserIdValid && isEmailValid && isPasswordValid && isPassword2Valid) {
      submitButton.style.backgroundColor = "#FCFCA8";
    } else {
      submitButton.style.backgroundColor = "";
    }
  };

  nicknameInput.addEventListener("input", validateNickname);
  userIdInput.addEventListener("input", validateUserId);
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);
  password2Input.addEventListener("input", validatePassword2);

  // 비밀번호 지우기
  const clearPwd1 = document.getElementById("clearPwd1");
  const clearPwd2 = document.getElementById("clearPwd2");

  clearPwd1.addEventListener("click", function () {
    passwordInput.value = "";
    validatePassword();
    validatePassword2(); // 비밀번호 확인 칸도 업데이트
  });

  clearPwd2.addEventListener("click", function () {
    password2Input.value = "";
    validatePassword2();
  });
});

// 비밀번호 표시 토글 기능
document.addEventListener("DOMContentLoaded", function () {
  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const inputBox = toggle.closest(".input_box");
      const pwdInput = inputBox.querySelector('input[type="password"], input[type="text"]');
      const eyeOpenSrc = toggle.getAttribute("data-eye-open");
      const eyeClosedSrc = toggle.getAttribute("data-eye-closed");

      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        toggle.src = eyeOpenSrc;
      } else {
        pwdInput.type = "password";
        toggle.src = eyeClosedSrc;
      }
    });
  });
});
