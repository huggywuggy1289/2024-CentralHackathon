document.querySelectorAll(".checkBox").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".checkBox").forEach(function (btn) {
      btn.classList.remove("clicked");
    });
    this.classList.toggle("clicked");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button_box button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
        const img = btn.querySelector("img");
        const imgSrc = img.getAttribute("src").replace("_active", "");
        img.setAttribute("src", imgSrc);
      });
      button.classList.add("active");
      const img = button.querySelector("img");
      const imgSrc = img.getAttribute("src").replace(".svg", "_active.svg");
      img.setAttribute("src", imgSrc);
    });
  });

  const basicButton = document.getElementById("basic");
  const premiumButton = document.getElementById("premium");
  const coloredText = document.querySelector(".colored");

  basicButton.addEventListener("click", () => {
    coloredText.textContent = "기본 요금제";
  });

  premiumButton.addEventListener("click", () => {
    coloredText.textContent = "프리미엄 요금제";
  });
});
