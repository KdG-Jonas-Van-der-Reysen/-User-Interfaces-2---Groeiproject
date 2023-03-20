import apiClient from "../../utilities/apiClient.js";
import {
    appendHtmlContent,
    formatDate,
    missionLabels,
    setHtmlContent,
    setTextContent
} from "../../utilities/commonUI.js";
import {switchToView} from "../../utilities/views.js";
import switchToTab from "../../utilities/tabs.js";
import Swal from "sweetalert2";

export async function loadMissionDetails(missionId) {
    const missionDetails = await apiClient.missions.get(missionId);

    // Load image
    const missionImage = document.getElementById("detailsImage");
    missionImage.src = missionDetails.missionImage;
    missionImage.classList.remove("d-none");

    // Load details
    setTextContent("detailsId", missionDetails.id);
    setTextContent("detailsName", missionDetails.name);
    setTextContent("detailsDescription", missionDetails.description);
    setTextContent("detailsLaunchDate", formatDate(missionDetails.launchDate));
    setHtmlContent("detailsStatus", `
        <span class="badge ${missionDetails.status}">
            ${missionLabels[missionDetails.status].text}
        </span>`,
        missionDetails.fuelRequired
    );
    setTextContent("detailsFuel", missionDetails.fuelRequired + ' liter')

    // Load astronauts
    await loadAstronautsForMission(missionId);
}

export async function showMissionDetails(missionId) {
    await loadMissionDetails(missionId);
    switchToView("missionDetails");
    switchToTab("detail")
}

async function loadAstronautsForMission(missionId) {
    const astronauts = await apiClient.astronauts.fromMission(missionId)
    setHtmlContent("astronautsList", "");
    astronauts
        .filter(astronaut => {
            return parseInt(astronaut.spaceMissionId) === parseInt(missionId)
        })
        .forEach(astronaut => addAstronautToList(astronaut));
}

function addAstronautToList(astronaut) {
    appendHtmlContent("astronautsList", `
    <tr>
        <td>${astronaut.id}</td>
        <td>${astronaut.name}</td>
        <td class="text-truncate">${formatDate(astronaut.dateOfBirth)}</td>
        <td>${astronaut.nationality}</td>
        <td><span class="badge bg-${(astronaut.hasEmergencyTraining ? "success" : "danger")}">${(astronaut.hasEmergencyTraining ? "Ja" : "Nee")}</span></td>
    </tr>`)
}

export async function addAstronaut() {
    // Get the astronauts
    const astronauts = await apiClient.astronauts.list();

    // Filter out the astronauts that are already assigned to a mission, and put them in an object
    let astronautsInObject = astronauts.reduce((obj, astronaut) => {
        if(parseInt(astronaut.spaceMissionId) === -1) {
            obj[astronaut.id] = astronaut.name;
        }
        return obj;
    }, {});

    // Ask the user to select an astronaut
    const {value: astronautId} = await Swal.fire({
        title: 'Kies een astronaut',
        input: 'select',
        inputOptions: astronautsInObject,
        inputPlaceholder: 'Selecteer een astronaut',
        showCancelButton: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value !== '') {
                    resolve()
                } else {
                    resolve('Vergeet je geen astronaut te kiezen?')
                }
            })
        }
    })

    // If the user selected an astronaut, add it to the mission
    if (astronautId) {
        let astronaut = await apiClient.astronauts.get(astronautId);
        astronaut.spaceMissionId = document.getElementById("detailsId").textContent;

        await apiClient.astronauts.edit(astronaut);
        await loadAstronautsForMission(astronaut.spaceMissionId);
    }
}