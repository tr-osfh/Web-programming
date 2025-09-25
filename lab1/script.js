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

let avaliableX = ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"];
let avaliableR = ["1", "1.5", "2", "2.5", "3"];




  if (!xSelected) {
    formError.textContent += "Выберите координату X!\n";
    document.getElementById("x-buttons").classList.add("error");
    isValid = false;
  } else if(!avaliableX.includes(xSelected)){
    formError.textContent += "Недопустимое значение X!\n"
    document.getElementById("x-buttons").classList.add("error");
    isValid = false;
}

  if (!rSelected) {
    formError.textContent += "Выберите параметр R!\n";
    isValid = false;

    document.getElementById("r-buttons").classList.add("error");
  } else if(!avaliableR.includes(rSelected)){
    formError.textContent += "Недопустимое значение R!\n"
    document.getElementById("r-buttons").classList.add("error");
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

    document
        .getElementById("deleteCookiesBtn")
        .addEventListener("click", function (event) {
            event.preventDefault();
            deleteCookie(COOKIE_KEY);
            document.getElementById("result_table").innerHTML = "";
        });

  document.getElementById("y").addEventListener("blur", function () {
    checkBlur();
  });

  document
    .querySelector('input[type="reset"]')
    .addEventListener("click", resetForm);

  formWasSubmitted = false;

    loadTableFromCookie();
});

function send(x, y, r) {
  start = performance.now();
  const data = JSON.stringify({ x: x.value, y: y.value, r: r.value });

  console.log(data);
  fetch(
    getLink(x, y, r),
    {
        mode: "cors",
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
        <td width="15%">${response.x}</td>
        <td width="15%">${response.y}</td>
        <td width="10%">${response.r}</td>
        <td width="25%">${response.time}</td>
        <td width="15%">${(performance.now() - start).toFixed(2)} мс</td>
        <td width="20%">${response.result}</td>
    `

    if (resultTable.firstChild) {
        resultTable.insertBefore(newRow, resultTable.firstChild);
    } else {
        resultTable.appendChild(newRow);
    }

    saveTableToCookie();
}


function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            const cookieValue = c.substring(nameEQ.length, c.length);
            try {
                return JSON.parse(decodeURIComponent(cookieValue));
            } catch (e) {
                console.error("Error parsing cookie:", e);
                return [];
            }
        }
    }
    return [];
}



function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}


function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

}


const COOKIE_KEY = 'savedResults';


function saveTableToCookie() {
    const resultTable = document.getElementById("result_table");
    const rows = resultTable.querySelectorAll("tr");
    const tableData = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");
        if (cells.length === 6) {
            tableData.push({
                x: cells[0].textContent,
                y: cells[1].textContent,
                r: cells[2].textContent,
                time: cells[3].textContent,
                executionTime: cells[4].textContent,
                result: cells[5].textContent
            });
        }
    }

    setCookie(COOKIE_KEY, tableData, 30);
    console.log('Таблица сохранена в куки');
}



function loadTableFromCookie() {
    const tableData = getCookie(COOKIE_KEY);

    if (tableData && tableData.length > 0) {
        const resultTable = document.getElementById("result_table");

        while (resultTable.rows.length > 1) {
            resultTable.deleteRow(1);
        }

        tableData.forEach(rowData => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td width="15%">${rowData.x}</td>
                <td width="15%">${rowData.y}</td>
                <td width="10%">${rowData.r}</td>
                <td width="25%">${rowData.time}</td>
                <td width="15%">${rowData.executionTime}</td>
                <td width="20%">${rowData.result}</td>
            `;
            resultTable.appendChild(newRow);
        });

        console.log('Таблица загружена из куки:', tableData.length, 'строк');
    }
}
