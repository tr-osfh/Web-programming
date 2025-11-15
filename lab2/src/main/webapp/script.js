const xId = "text-x";
const yId = "text-y";
const rId = "text-r";



function changeR(){
    if (document.getElementById(rId).value !== "") {
        const rValue = document.getElementById(rId).value.replace(',', '.');

        document.querySelectorAll(".graph-r").forEach((sign) => {
            sign.textContent = rValue;
        });
        document.querySelectorAll(".graph-r-2").forEach((sign) => {
            sign.textContent = (rValue / 2).toString();
        });
        document.querySelectorAll(".graph-minus-r").forEach((sign) => {
            sign.textContent = "-" + rValue;
        });
        document.querySelectorAll(".graph-minus-r-2").forEach((sign) => {
            sign.textContent = "-" + (rValue / 2).toString();
        });

        let tableData = getTableData();

        drawPoints(tableData);
    }
}

function getTableData() {
    const table = document.getElementById("result_table");
    const rows = table.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length >= 4) {
            data.push({
                x: parseFloat(cells[0].textContent),
                y: parseFloat(cells[1].textContent),
                r: parseFloat(cells[2].textContent),
                value: cells[3].textContent.trim().toLowerCase() === 'true'
            });
        }
    }

    return data;
}

function drawPoint(x, y, r, hit) {
    let svgPointX = (parseFloat(x) * 100 / r) + 200;
    let svgPointY = 200 - (parseFloat(y) * 100 / r);
    let svg = document.getElementById("graph");
    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", svgPointX.toString());
    dot.setAttribute("cy", svgPointY.toString());
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", hit ? "green" : "red");

    svg.appendChild(dot);
}

function drawPoints(points) {
    console.log('drawing')
    let r = document.getElementById(rId).value;
    if (r === "") r = 3;

    const svg = document.getElementById("graph");
    const oldPoints = svg.querySelectorAll("circle");
    oldPoints.forEach(point => point.remove());

    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (point.r == r){
            drawPoint(point.x, point.y, r, point.value);
        }
    }
}

function resetForm() {
  document.querySelectorAll(".x-button, .y-button, .r-button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById("selected-x").value = "";
  document.getElementById("selected-y").value = "";
  document.getElementById("selected-r").value = "";

  const xInput = document.getElementById("text-x");
  xInput.value = "";
  xInput.classList.remove("error");

  const yInput = document.getElementById("text-y");
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
  const rButtons = document.getElementById("r-buttons");
  if (rButtons) rButtons.classList.remove("error");

}

function validateText(element, inf, sup){
    let x = element.value;

    x = x.replace(',', '.');
    element.value = x;

    if (x === "") {
        return "1"; // Выберите значение
    } else if (x[0] < inf || x[0] > sup){
        return "2"; // недопустимое значение
    } else if (x >= inf && x <= sup) {
        return "0"; // все хорошо
    }
}


document.getElementById("area").addEventListener("click", function (e) {
    const point = document.getElementById("graph").createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;

    const svgPoint = point.matrixTransform(document.getElementById('graph').getScreenCTM().inverse());
    let r = document.getElementById(rId);
    let valr = validateText(r, 2, 5);
    const formError = document.getElementById("form-error");
    if (valr === "0"){
        let userPointX = (((svgPoint.x - 200) / 100 * r.value).toFixed(2));
        let userPointY = (((200 - svgPoint.y) / 100 * r.value).toFixed(2));
        console.log(`Координаты на плоскости: x=${userPointX}, y=${userPointY}, Координаты в svg: (${svgPoint.x.toFixed(2)}, ${svgPoint.y.toFixed(2)}), r = ${r.value}`);
        sendFromGraph(userPointX, userPointY, r.value);
        formError.style.display = "none";
        formError.textContent = "";
    } else if (valr === "1") {
        formError.textContent = "Выберите значение R!"
        formError.style.display = "block";
    } else {
        formError.textContent = "Недопустимое значение для R!"
        formError.style.display = "block";
    }

})


document.addEventListener("DOMContentLoaded", function () {
    drawPoints(getTableData());

  document.querySelectorAll(".r-button").forEach((button) => {
      button.addEventListener("click", function() {
          rSelection(this);
          if (tableData && tableData.length > 0) {
              drawPoints(tableData);
          }
      });
  });

  document.querySelectorAll('input[name="radio-y"]').forEach(radio => {
      radio.addEventListener('change', function() {
          yRadioSelection(this);
      });
  });

  if (getCookie("r")) {
      document.getElementById(rId).value = getCookie("r");
      changeR();
  }

document.querySelectorAll('input[name="text-r"]').forEach(checkbox => {
    checkbox.addEventListener("change", function () {
        setCookie("r", document.getElementById(rId).value, 30);
        changeR();
    });
});

document
  .getElementById("coordinates")
  .addEventListener("submit", function (event) {
    event.preventDefault();
      send(
       document.getElementById(xId),
       document.getElementById(yId),
       document.getElementById(rId)
      );

  });
  document
    .querySelector('input[type="reset"]')
    .addEventListener("click", resetForm);

});

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
    return false;
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

function send(x, y, r) {
    start = performance.now();

    fetch(
        `/labDVA/controller?x=${x.value}&y=${y.value}&r=${r.value}&source=form`, {
            method: "GET",
        })
        .then((response) => {
            return response.text().then(html => {
                if (!response.ok) {
                    console.log("Error HTML received");
                    document.open();
                    document.write(html);
                    document.close();
                    return;
                }
                console.log("HTML response received");
                document.open();
                document.write(html);
                document.close();
            });
        })
        .catch((error) => {
            console.error('Network error:', error);
            showError('Ошибка сети: ' + error.message);
        });
}

function sendFromGraph(x, y, r) {
    start = performance.now();
    const data = JSON.stringify({x, y, r});

    x = x.toString().replace(',', '.');
    y = y.toString().replace(',', '.');
    r = r.toString().replace(',', '.');

    console.log(data);
    fetch(
        `/labDVA/controller?x=${x}&y=${y}&r=${r}&source=graph`,
        {
            mode: "cors",
            method: "GET",
        }
    ).then((response) => {
        if (!response.ok) {
            if (response.status === 500) {
                return response.text().then(text => {
                    const err = new DOMParser().parseFromString(text, "text/html");
                    const txt = err.body.textContent
                    throw new Error(txt);
                })
            }
        }
        return response.json();
    })
        .then(response => {
            console.log(response);
            showResponse(response);
            drawPoint(response.x, response.y, response.r, response.result);
        })
}


function showResponse(response) {
    try{
        document.getElementById("no-result").style.display = "none";
    } catch (error) {
        console.log(error);
    }
    const resultTable = document.getElementById("result_table");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td width="25%">${response.x}</td>
        <td width="25%">${response.y}</td>
        <td width="25%">${response.r}</td>
        <td width="25%">${response.result}</td>
    `

    if (resultTable.firstChild) {
        resultTable.insertBefore(newRow, resultTable.firstChild);
    } else {
        resultTable.appendChild(newRow);
    }
}
