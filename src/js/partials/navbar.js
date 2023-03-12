export function loadNavBar() {
    updateWebsiteParams();
}

export function updateWebsiteParams() {
    document.getElementById("websiteName").innerText = localStorage.getItem("websiteName") || "Space Mission System";

    const websiteColor = localStorage.getItem("navbarColor") || "nikskeniet";
    const colorClass = `bg-${websiteColor}`;

    const navbar = document.getElementById("navbar");
    const classList = [...navbar.classList];
    const presentClass = classList
        .find(className => className.startsWith("bg-"));

    if (presentClass) navbar.classList.remove(presentClass);

    navbar.classList.add(colorClass);
}