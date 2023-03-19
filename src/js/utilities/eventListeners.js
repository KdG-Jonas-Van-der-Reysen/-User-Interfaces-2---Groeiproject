import switchToTab from "./tabs.js";
import {showMissionDetails} from "../views/detail/detailsView.js";

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

export function registerMissionDetailClickthrough() {
    // Link event listeners
    const missionCards = document.querySelectorAll(".mission-clickthrough");
    missionCards.forEach(missionCard => {
        missionCard.addEventListener("click", async (e) => {
            e.preventDefault();
            const missionId = missionCard.getAttribute("data-mission-id")
            showMissionDetails(missionId);
        });
    })
}