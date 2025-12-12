function getRValue() {
    const rElement = document.getElementById("form:r_input");
    if (rElement && rElement.value) {
        return parseFloat(rElement.value.replace(',', '.'));
    }
    return null;
}

function changeR() {
    const rValue = getRValue();
    if (rValue === null) {
        return;
    }

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

    drawPointsForCurrentR();
}

function getTableData() {
    const table = document.getElementById("form:results-table");
    if (!table) {
        return [];
    }
    const tbody = table.getElementsByTagName("tbody")[0];
    if (!tbody) {
        return [];
    }
    const rows = tbody.getElementsByTagName('tr');
    const data = [];

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length >= 4) {
            const x = parseFloat(cells[0].textContent.trim().replace(',', '.'));
            const y = parseFloat(cells[1].textContent.trim().replace(',', '.'));
            const r = parseFloat(cells[2].textContent.trim().replace(',', '.'));
            const resultText = cells[3].textContent.trim();

            if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
                data.push({ x: x, y: y, r: r, value: resultText === 'Попадание' });
            }
        }
    }
    return data;
}

function drawPoint(x, y, r, hit) {
    const svg = document.getElementById("graph");
    if (!svg) return;

    let svgPointX = (x * 100 / r) + 200;
    let svgPointY = 200 - (y * 100 / r);

    let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", svgPointX.toString());
    dot.setAttribute("cy", svgPointY.toString());
    dot.setAttribute("r", "4");
    dot.setAttribute("fill", hit ? "green" : "red");
    dot.classList.add("result-point"); // Add a class for easy removal

    svg.appendChild(dot);
}

function drawPointsForCurrentR() {
    const r = getRValue();
    if (r === null) return;

    const svg = document.getElementById("graph");
    if (!svg) return;

    const oldPoints = svg.querySelectorAll(".result-point");
    oldPoints.forEach(point => point.remove());

    const points = getTableData();
    points.forEach(point => {
        if (point.r === r) {
            drawPoint(point.x, point.y, point.r, point.value);
        }
    });
}

function handleGraphClick(event) {
    const rValue = getRValue();
    const errorMessageElement = document.getElementById("error-message");
    const graph = document.getElementById('graph');

    if (rValue === null) {
        errorMessageElement.textContent = "Выберите значение R перед кликом по графику!";
        errorMessageElement.style.display = "block";
        return;
    }
    
    errorMessageElement.style.display = "none";

    const point = graph.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const svgPoint = point.matrixTransform(graph.getScreenCTM().inverse());

    const userPointX = (((svgPoint.x - 200) / 100) * rValue).toFixed(2);
    const userPointY = (((200 - svgPoint.y) / 100) * rValue).toFixed(2);

    document.getElementById("form:clickX").value = userPointX;
    document.getElementById("form:clickY").value = userPointY;
    document.getElementById("form:clickR").value = rValue;

    document.getElementById("form:graphSubmitBtn").click();
}


function addAutoSave(){
    document.getElementById("form:reset-table").addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("form:save-table").click();
        }, 200)
    })
}


document.addEventListener("DOMContentLoaded", () => {
    changeR();
    
    setTimeout(() => {
        document.getElementById("form:getAllHitsDB").click();

        const yInput = document.getElementById("form:y");
        yInput.addEventListener("change", ()=> {
            yInput.value.trim().replace(',', '.');
        });

        addAutoSave();

    }, 100);

    const area = document.getElementById("area");
    if (area) {
        area.addEventListener("click", handleGraphClick);
    }

    const rSpinner = document.getElementById("form:r");
    if (rSpinner) {
        rSpinner.addEventListener("click", () => {
            setTimeout(changeR, 50);
        });
    }


    if (window.jsf) {
        jsf.ajax.addOnEvent(function(data) {
            if (data.status === "success") {
                setTimeout(changeR, 100);
            }
        });
    }
});
