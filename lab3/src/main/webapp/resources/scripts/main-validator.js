function validateForm() {
    hideError();
    let error = "";
    let isError = false;

    const xCheckboxes = [
        document.querySelector('[id*="xMinus4"]'),
        document.querySelector('[id*="xMinus3"]'),
        document.querySelector('[id*="xMinus2"]'),
        document.querySelector('[id*="xMinus1"]'),
        document.querySelector('[id*="xZero"]'),
        document.querySelector('[id*="xPlus1"]'),
        document.querySelector('[id*="xPlus2"]')
    ];

    let xSelected = false;
    xCheckboxes.forEach(checkbox => {
        if (checkbox && checkbox.checked) {
            xSelected = true;
        }
    });

    if (!xSelected) {
        error += "Выберите хотя бы одно значение X\n";
        isError = true;
    }

    const yInput = document.getElementById("form:y");
    if (yInput) {
        const yValue = yInput.value.trim().replace(',', '.');
        yInput.value = yValue;

        if (yValue === "") {
            error += "Поле Y не может быть пустым\n";
            isError = true;
        }
        else if (isNaN(parseFloat(yValue)) || !isFinite(yValue)) {
            error += "Значение Y должно быть числом\n";
            isError = true;
        }
        else {
            const yNum = parseFloat(yValue);
            if (yNum <= -5 || yNum >= 5) {
                error += "Значение Y должно быть в диапазоне (-5, 5)\n";
                isError = true;
            }
        }
    } else {
        error += "Поле Y не найдено\n";
        isError = true;
    }

    const rInput = document.getElementById('form:r_input');
    if (rInput) {
        const rValue = rInput.value.trim().replace(',', '.'); // Replace comma with dot

        if (rValue === "") {
            error += "Поле R не может быть пустым\n";
            isError = true;
        }
        else if (isNaN(parseFloat(rValue)) || !isFinite(rValue)) {
            error += "Значение R должно быть числом\n";
            isError = true;
        }

        else {
            const rNum = parseFloat(rValue);
            if (rNum < 1.0 || rNum > 3.0) {
                error += "Значение R должно быть в диапазоне от 1.0 до 3.0\n";
                isError = true;
            }
            
            else if (Math.round(rNum * 10) % 5 !== 0) {
                error += "Значение R должно быть кратно 0.5 (1.0, 1.5, 2.0, 2.5, 3.0)\n";
                isError = true;
            }
        }
    } else {
        error += "Поле R не найдено\n";
        isError = true;
    }

    if (isError) {
        showError(error);
        return false;
    }
    return true;
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        const formattedMessage = message.replace(/\n/g, '<br>');
        errorDiv.innerHTML = formattedMessage;
        errorDiv.style.display = 'block';

        setTimeout(hideError, 5000);
    }
}

function hideError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.innerHTML = '';
    }
}