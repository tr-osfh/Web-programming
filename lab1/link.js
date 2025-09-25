let link = `https://se.ifmo.ru/~s466342/`;
let endpoint = `proxy.php`;

function getLink(x, y, r){
    return link + endpoint + `?x=${x.value}&y=${y.value.replace(/,/g, ".")}&r=${r.value}`;
}


