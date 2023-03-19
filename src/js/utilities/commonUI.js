export function fillMissionField(fieldId, value) {
    fillField("mission" + fieldId, value);
}

export function getMissionInputValue(fieldName) {
    return getInputValue("mission" + fieldName);
}


// Generic functions
export function fillField(fieldId, value) {
    document.getElementById(fieldId).value = value;
}
export function getInputValue(fieldName) {
    return document.getElementById(fieldName).value;
}

export function setTextContent(elementId, text) {
    document.getElementById(elementId).textContent = text;
}

export function setHtmlContent(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

export function appendHtmlContent(elementId, html) {
    document.getElementById(elementId).innerHTML += html;
}

export function formatDate(date) {
    const dateFormattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return new Date(date).toLocaleDateString('nl-be', dateFormattingOptions)
}
