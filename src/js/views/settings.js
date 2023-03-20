import {updateWebsiteParams} from "../partials/navbar.js";

export default function loadSettingsPage() {
    document.getElementById("settingsForm").addEventListener("submit", saveSettings);

    // Initialize the form
    document.getElementById("settingsWebsiteName").value = localStorage.getItem("websiteName") || "Space Mission System";
    document.getElementById("settingsNavbarColor").value = localStorage.getItem("navbarColor") || "nikskeniet";
}

function saveSettings(e) {
    e.preventDefault();

    let websiteName = document.getElementById("settingsWebsiteName").value;
    localStorage.setItem("websiteName", websiteName);

    let navbarColor = document.getElementById("settingsNavbarColor").value;
    localStorage.setItem("navbarColor", navbarColor);

    // Update the websites
    updateWebsiteParams();
}