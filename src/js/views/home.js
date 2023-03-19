import apiClient from "../utilities/apiClient.js";
import {appendHtmlContent} from "../utilities/commonUI.js";
import {showMissionDetails} from "./detail/detailsView.js";
import {registerMissionDetailClickthrough} from "../utilities/eventListeners.js";

export default async function loadHomePage() {
    // Load the missions
    const missions = await apiClient.missions.list();

    const missionList = document.getElementById("missionCardList");

    // Clear the mission list
    missionList.innerHTML = "";

    // Add the missions to the list
    missions.forEach(mission => addMission(mission));

    registerMissionDetailClickthrough();
}

function addMission(mission) {
    appendHtmlContent("missionCardList", `
    <div class="col-md-2">
        <a class="text-dark text-decoration-none mission-clickthrough"
           href="#" data-mission-id="${mission.id}">
            <div class="card shadow border-0">
                <img class="card-img-top w-100 d-block"
                     src="${mission.missionImage}"
                     alt="Afbeelding van de missie ${mission.name}">
                <div class="card-body">
                    <h4 class="card-title mb-0">${mission.name}</h4>
                </div>
            </div>
        </a>
    </div>
    `);
}

function missionCardClicked(e) {
    e.preventDefault();
    const missionId = e.currentTarget.dataset.missionId;
    showMissionDetails(missionId);
}