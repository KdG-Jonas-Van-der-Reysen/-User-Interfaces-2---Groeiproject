import switchToTab from "./tabUtility.js";
import {switchToView} from "./viewUtility.js";

export default function coupleEventListeners() {
    // Register clickthrough on all switch tab elements
    const stElements = document.querySelectorAll('.switch-tab');

    stElements.forEach(elem => {
        elem.addEventListener("click", () => {
            const tabName = elem.getAttribute('data-tab-name');
            switchToTab(tabName)

        })
    })

    // Register clickthrough on detail page buttons
    const btnAddMissionView = document.getElementById('btnAddMissionView');
    const btnEditMissionView = document.getElementById('btnEditMissionView');

    const addMissionView = document.getElementById('add-mission');
    const editMissionView = document.getElementById('edit-mission');

    function showView(view) {
        view.classList.remove('d-none');
    }

    btnAddMissionView.addEventListener("click", () => {
        switchToView('add-mission')
    })

    btnEditMissionView.addEventListener("click", () => {
       switchToView('edit-mission')
    })
}