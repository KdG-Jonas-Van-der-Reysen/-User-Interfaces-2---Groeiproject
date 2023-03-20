import {editState, newState} from "./formView.js";
import {switchToView} from "../../utilities/views.js";
import loadForm from "./formView.js";
import apiClient from "../../utilities/apiClient.js";
import Swal from "sweetalert2";
import {toast} from "../../utilities/toast.js";
import {addAstronaut} from "./detailsView.js";
import switchToTab from "../../utilities/tabs.js";

export default async function loadDetailsPage() {
    // -- FORM VIEW (edit, new) -- //
    // Load the form
    loadForm();

    // Register clickthrough on the add mission button
    const addMissionButton = document.getElementById('btnAddMissionView');
    const addMissionButton2 = document.getElementById('btnAddMissionView2');
    addMissionButton.addEventListener('click', newState);
    addMissionButton2.addEventListener('click', newState);

    // -- DETAILS VIEW -- //

    // Register clickthrough on the edit mission button
    const editMissionButton = document.getElementById("editMissionButton");
    editMissionButton.addEventListener('click', async () => {
        // Load in the mission details
        const missionId = document.getElementById("detailsId").textContent;
        await editState(missionId);

        switchToView("missionForm");
    });

    const deleteMissionButton = document.getElementById("deleteMissionButton");
    deleteMissionButton.addEventListener('click', async () => {
        // Eerst de missie ophalen
        const missionId = document.getElementById("detailsId").textContent;
        const mission = await apiClient.missions.get(missionId);

        const deleteConfirmation = await Swal.fire({
            title: `Wil je de missie ${mission.name} verwijderen?`,
            text: "Deze actie kan niet ongedaan gemaakt worden!",
            showDenyButton: true,
            imageUrl: mission.missionImage,
            imageWidth: 400,
            imageAlt: 'Afbeelding van de missie',
            confirmButtonText: 'Verwijderen',
            denyButtonText: `Annuleren`,

            confirmButtonColor: '#d33',
            denyButtonColor: '#3085d6',
        })

        /* Read more about isConfirmed, isDenied below */
        if (deleteConfirmation.isConfirmed) {
            await apiClient.missions.delete(missionId);

            // Load the mission details and switch to the details view
            switchToTab("home")

            // Show the success message
            await toast.fire({
                icon: 'success',
                title: 'De missie is verwijderd'
            })
        }
    })

    const addAstronautButton = document.getElementById("btnAddAstronaut");
    addAstronautButton.addEventListener('click', addAstronaut);
}