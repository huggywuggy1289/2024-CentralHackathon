function submitForm() {
  document.getElementById("modifyTimeForm").submit();
}

function formatTimeWithMeridiem(hours, minutes) {
  const period = hours >= 12 ? "오후" : "오전";
  const formattedHours = hours % 12 || 12;
  return `${period} ${String(formattedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const morningTimeInput = document.getElementById("morningTime");
  const morningTimePlusOneHourDisplay = document.getElementById("morningTimePlusOneHour");
  const nightTimeInput = document.getElementById("nightTime");
  const nightTimePlusOneHourDisplay = document.getElementById("nightTimePlusOneHour");

  function updateMorningPlusOneHourTime() {
    const time = morningTimeInput.value;
    if (time) {
      const [hours, minutes] = time.split(":");
      let date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      date.setMinutes(date.getMinutes() + 60);

      const newHours = date.getHours();
      const newMinutes = date.getMinutes();
      morningTimePlusOneHourDisplay.textContent = formatTimeWithMeridiem(newHours, newMinutes);
    } else {
      morningTimePlusOneHourDisplay.textContent = "";
    }
  }

  function updateNightPlusOneHourTime() {
    const time = nightTimeInput.value;
    if (time) {
      const [hours, minutes] = time.split(":");
      let date = new Date();
      date.setHours(parseInt(hours));
      date.setMinutes(parseInt(minutes));
      date.setMinutes(date.getMinutes() + 60);

      const newHours = date.getHours();
      const newMinutes = date.getMinutes();
      nightTimePlusOneHourDisplay.textContent = formatTimeWithMeridiem(newHours, newMinutes);
    } else {
      nightTimePlusOneHourDisplay.textContent = "";
    }
  }

  morningTimeInput.addEventListener("input", updateMorningPlusOneHourTime);
  nightTimeInput.addEventListener("input", updateNightPlusOneHourTime);
  updateMorningPlusOneHourTime(); // Initialize on page load
  updateNightPlusOneHourTime(); // Initialize on page load

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
});
