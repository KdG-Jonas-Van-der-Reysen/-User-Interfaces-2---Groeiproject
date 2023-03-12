import switchToTab from "./tabs.js";

export default function initializeTabSystem() {
    // Register clickthrough on all switch tab elements
    const stElements = document.querySelectorAll('.switch-tab');

    stElements.forEach(elem => {
        elem.addEventListener("click", () => {
            const tabName = elem.getAttribute('data-tab-name');
            switchToTab(tabName)

        })
    })
}