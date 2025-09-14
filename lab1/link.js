let link = `http://localhost:13121/fcgi-bin/`;
let endpoint = `webLab1.jar`;

function getLink(x, y, r){
    return link + endpoint + `?x=${x.value}&y=${y.value.replace(/,/g, ".")}&r=${r.value}`;
}


