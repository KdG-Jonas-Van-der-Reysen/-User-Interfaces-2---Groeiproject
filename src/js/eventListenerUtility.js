import switchToTab from "./tabUtility.js";

export default function coupleEventListeners() {
    // Register clickthrough on all switch tab elements
    const stElements = document.querySelectorAll('.switch-tab');

    stElements.forEach(elem => {
        elem.addEventListener("click",() => {
            const tabName = elem.getAttribute('data-tab-name');
            switchToTab(tabName)

        })
    })

    // Register clickthrough on detail page buttons
    const btnAddMissionView = document.getElementById('btnAddMissionView');
    const btnEditMissionView = document.getElementById('btnEditMissionView');

    const addMissionView = document.getElementById('add-mission');
    const editMissionView = document.getElementById('edit-mission');

    btnAddMissionView.addEventListener("click",() => {
        // Hide edit mission view
        editMissionView.classList.add('d-none');

        // Show add mission view
        addMissionView.classList.remove('d-none');
    })


    btnEditMissionView.addEventListener("click",() => {
        // Hide add mission view
        addMissionView.classList.add('d-none');

        // Show edit mission view
        editMissionView.classList.remove('d-none');
    })
}