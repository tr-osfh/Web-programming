function xSelection(button) {
  document.querySelectorAll(".x-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  document.getElementById("selected-x").value = button.value;

  document.getElementById("x-buttons").classList.remove("error");
}

function rSelection(button) {
  document.querySelectorAll(".r-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
  document.getElementById("selected-r").value = button.value;
  document.getElementById("r-buttons").classList.remove("error");
}

function resetForm() {
  document.querySelectorAll(".x-button, .r-button").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.getElementById("selected-x").value = "";
  document.getElementById("selected-r").value = "";

  const yInput = document.getElementById("y");
  yInput.value = "";
  yInput.classList.remove("error");

  const yError = document.getElementById("y-error");
  if (yError) {
    yError.textContent = "";
  }
  const formError = document.getElementById("form-error");
  if (formError) {
    formError.textContent = "";
    formError.style.display = "none";
  }
  const xButtons = document.getElementById("x-buttons");
  const rButtons = document.getElementById("r-buttons");
  if (xButtons) xButtons.classList.remove("error");
  if (rButtons) rButtons.classList.remove("error");

  formWasSubmitted = false;
}

function validateY(showErrors = false) {
  const yInput = document.getElementById("y");
  const yValue = yInput.value.trim();

  yInput.classList.remove("error");

  if (yValue === "") {
    if (showErrors) {
      yInput.classList.add("error");
    }
    return "1";
  }

  if (isNaN(yValue.replace(",", "."))) {
    if (showErrors) {
      yInput.classList.add("error");
    }
    return "2";
  }

  const y = parseFloat(yValue.replace(",", "."));

  if (y < -3 || y > 5) {
    if (showErrors) {
      yInput.classList.add("error");
    }
    return "3";
  }

  return "0";
}

function validate(event) {
  const xSelected = document.getElementById("selected-x").value;
  const rSelected = document.getElementById("selected-r").value;
  const formError = document.getElementById("form-error");

  formError.textContent = "";

  let isValid = true;

  if (!xSelected) {
    formError.textContent += "Выберите координату X!\n";

    document.getElementById("x-buttons").classList.add("error");
    isValid = false;
  }

  let yInput = document.getElementById("y");
  let validY = validateY(true);
  if (!(validY == "0")) {
    if (validY == "1") {
      formError.textContent += "Поле Y не может быть пустым!\n";
      yInput.classList.add("error");
      isValid = false;
    }
    if (validY == "2") {
      formError.textContent += "Координтат Y должна быть числом!\n";
      yInput.classList.add("error");
      isValid = false;
    }
    if (validY == "3") {
      formError.textContent += "Координата Y должна быть между -3 и 5!\n";
      yInput.classList.add("error");
      isValid = false;
    }
    isValid = false;
  }

  if (!rSelected) {
    formError.textContent += "Выберите параметр R!\n";
    isValid = false;

    document.getElementById("r-buttons").classList.add("error");
  }

  if (!isValid) {
    event.preventDefault();
    formError.style.display = "block";
    return false;
  }

  formError.style.display = "none";
  return true;
}

let formWasSubmitted = false;

function checkBlur() {
  if (formWasSubmitted) {
    validateY(true);
  } else {
    validateY(false);
  }
}

let start = performance.now();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".x-button").forEach((button) => {
    button.addEventListener("click", function () {
      xSelection(this);
    });
  });
  document.querySelectorAll(".r-button").forEach((button) => {
    button.addEventListener("click", function () {
      rSelection(this);
    });
  });

  document
    .getElementById("coordinates")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validate(event)) {
        send(
          document.getElementById("selected-x"),
          document.getElementById("y"),
          document.getElementById("selected-r")
        );
      }

      formWasSubmitted = true;
      validate(event);
    });

  document.getElementById("y").addEventListener("blur", function () {
    checkBlur();
  });

  document
    .querySelector('input[type="reset"]')
    .addEventListener("click", resetForm);

  formWasSubmitted = false;
});

function send(x, y, r) {
  start = performance.now();
  const data = JSON.stringify({ x: x.value, y: y.value, r: r.value });

  console.log(data);
  fetch(
    `http://localhost:13121/fcgi-bin/webLab1.jar?x=${x.value}&y=${y.value}&r=${r.value}`,
    {
      method: "GET",
    }
  ).then((response) => {
    response
      .json()
      .then((result) => {
        console.log("response accepted");
        console.log(result);
        showResponse(result);
      })
      .catch((error) => console.error("Error:", error));
  });
}

function showResponse(response) {
  const resultTable = document.getElementById("result_table");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td>${response.x}</td>
        <td>${response.y}</td>
        <td>${response.r}</td>
        <td>${response.time}</td>
        <td>${
            response.result
        }</td>
                <td>${
            start - performance.now()
        }</td>
    
    `

    resultTable.appendChild(newRow);
}
