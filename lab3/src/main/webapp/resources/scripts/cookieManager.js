function setCookie(name, value) {
    const days = 1;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        const plus2 = document.getElementById("form:xPlus2");
        const plus1 = document.getElementById("form:xPlus1");
        const plus0 = document.getElementById("form:xZero");
        const minus1 = document.getElementById("form:xMinus1");
        const minus2 = document.getElementById("form:xMinus2");
        const minus3 = document.getElementById("form:xMinus3");
        const minus4 = document.getElementById("form:xMinus4");

        plus2.addEventListener("change", () => {setCookie("plus2", plus2.checked);});
        plus1.addEventListener("change", () => {setCookie("plus1", plus1.checked);});
        plus0.addEventListener("change", () => {setCookie("plus0", plus0.checked);});
        minus1.addEventListener("change", () => {setCookie("minus1", minus1.checked);});
        minus2.addEventListener("change", () => {setCookie("minus2", minus2.checked);});
        minus3.addEventListener("change", () => {setCookie("minus3", minus3.checked);});
        minus4.addEventListener("change", () => {setCookie("minus4", minus4.checked);});


        const yInput = document.getElementById("form:y");
        if (yInput) {
            yInput.addEventListener("change", () => {setCookie("y", yInput.value);});
            const savedY = getCookie("y");
            if (savedY && savedY !== "false") {
                yInput.value = savedY.replace(',', '.');
            }
        }

        const rSpinner = document.getElementById("form:r_input");
        if (rSpinner) {
            rSpinner.addEventListener("change", () => {setCookie("rSpinner", rSpinner.value);});
            const savedR = getCookie("rSpinner");
            if (savedR && savedR !== "false") {
                rSpinner.value = savedR.replace(',', '.');
            }
        }

        plus2.checked = getCookie("plus2");
        plus1.checked = getCookie("plus1");
        plus0.checked = getCookie("plus0");
        minus1.checked = getCookie("minus1");
        minus2.checked = getCookie("minus2");
        minus3.checked = getCookie("minus3");
        minus4.checked = getCookie("minus4");
    }, 200);
});







