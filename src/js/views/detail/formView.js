import {switchToView} from "../../utilities/views.js";
import apiClient from "../../utilities/apiClient.js";
import { toast } from "../../utilities/toast.js";
import { fillMissionField, getMissionInputValue } from "../../utilities/commonUI.js";
import {showMissionDetails} from "./detailsView.js";

export default function loadForm() {
    // Listen to the image url input field
    const missionImageUrlInput = document.getElementById("missionImageUrl");
    const image = document.getElementById("missionImage");

    missionImageUrlInput.addEventListener("change", (e) => {
        image.src = missionImageUrlInput.value;
        image.classList.remove("d-none");
    });

    // Listen to the submit button
    const submitMissionButton = document.getElementById('submitMission');

    submitMissionButton.addEventListener('click', async (e) => {
        e.preventDefault();

        if (document.getElementById("missionId").value === "") {
            await addMission();
        } else {
            // TODO: Edit mission
            await editMission();

            // await updateMission();
        }
    });
}
export async function loadMissionIntoForm(id) {
    let missionErrorMessage = document.getElementById("statusNotification")
    try {
        const mission = await apiClient.missions.get(id);

        // Clear the error message
        missionErrorMessage.classList.add("d-none");

        // Fill the form fields
        fillMissionField("Id", mission.id)
        fillMissionField("Name", mission.name);
        fillMissionField("Description", mission.description);
        fillMissionField("LaunchDate", mission.launchDate);
        fillMissionField("Status", mission.status);
        fillMissionField("ImageUrl", mission.missionImage);
        fillMissionField("Fuel", mission.fuelRequired);

        // Fill the image
        const missionImage = document.getElementById("missionImage")
        missionImage.src = mission.missionImage;
        missionImage.classList.remove("d-none");
        return;

    } catch (error) {
        // Show the error message
        missionErrorMessage.classList.remove("d-none");
        missionErrorMessage.classList.add("alert-danger");
        missionErrorMessage.classList.add("alert-success");

        missionErrorMessage.textContent = "Er is iets misgelopen bij het ophalen van de missie, probeer het aub later opnieuw.";

        // Log the error to the console
        console.error(error);
        return;
    }

}

export function verifyNotEmpty(fieldName, value) {
    if (value === "") {
        const errorElement = document.getElementById(`mission${fieldName}Error`);

        errorElement.textContent = `Het veld ${fieldName} mag niet leeg zijn`;
        errorElement.classList.remove("d-none");

        return false;
    }
    return true;
}

export function clearForm() {
    const form = document.getElementById('missionDetails');
    const image = document.getElementById("missionImage");

    // Reset the form
    document.getElementById("missionId").value = "";
    form.reset();

    // Hide the image
    image.classList.add("d-none");
}

export function newState() {
    clearForm();
    document.getElementById("submitMission").innerHTML = "Missie toevoegen";
    document.getElementById("formTitle").textContent = "Missie toevoegen";

    switchToView("missionForm");
}

export async function editState(missionId) {
    await loadMissionIntoForm(missionId);

    document.getElementById("submitMission").innerHTML = "Wijzigingen opslaan";
    document.getElementById("formTitle").textContent = "Missie bewerken";
}

function getMissionDraft() {
    let missionDetails = {
        name: getMissionInputValue("Name"),
        launchDate: getMissionInputValue("LaunchDate"),
        status: getMissionInputValue("Status"),
        fuelRequired: parseFloat(getMissionInputValue("Fuel")),
        missionImage: getMissionInputValue("ImageUrl"),
        description: getMissionInputValue("Description")
    }

    // Make sure nothing is empty by putting it into an array first
    const validationResults = [
        verifyNotEmpty("Name", missionDetails.name),
        verifyNotEmpty("LaunchDate", missionDetails.launchDate),
        verifyNotEmpty("Status", missionDetails.status),
        verifyNotEmpty("Fuel", missionDetails.fuelRequired),
        verifyNotEmpty("ImageUrl", missionDetails.missionImage),
        verifyNotEmpty("Description", missionDetails.description)
    ];

    // If any of the validation results is false, return
    if (validationResults.includes(false)) {
        return null;
    }

    return missionDetails
}

async function addMission() {
    const missionDetails = getMissionDraft();
    if (missionDetails === null) {
        return;
    }

    const missionAdded = await apiClient.missions.add(missionDetails);
    const addedMission = await missionAdded.json();

    // If the response is not ok, show the error message
    if (!missionAdded.ok) {

        toast.fire({
            icon: 'error',
            title: 'Er is iets misgelopen bij het aanmaken van de missie. Probeer het aub later opnieuw.'
        })
    } else {
        // Show the success message
        toast.fire({
            icon: 'success',
            title: 'De missie werd succesvol aangemaakt!'
        })

        // Load the mission details and switch to the details view
        await showMissionDetails(addedMission.id);
    }
}
async function editMission() {
    let missionDetails = getMissionDraft();
    if (missionDetails === null) {
        return;
    }

    missionDetails.id = document.getElementById("missionId").value;


    const missionEdited = await apiClient.missions.edit(missionDetails);
    const editedMission = await missionEdited.json();

    // If the response is not ok, show the error message
    if (!missionEdited.ok) {
        toast.fire({
            icon: 'error',
            title: 'Er is iets misgelopen bij het bewerken van de missie. Probeer het aub later opnieuw.'
        })
    } else {
        // Show the success message
        toast.fire({
            icon: 'success',
            title: 'De missie werd succesvol aangepast!'
        })

        // Load the mission details and switch to the details view
        await showMissionDetails(editedMission.id);
    }
}