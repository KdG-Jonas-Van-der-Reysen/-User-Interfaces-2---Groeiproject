import apiClient from "../utilities/apiClient.js";
import {formatDate} from "../utilities/commonUI.js";
import {registerMissionDetailClickthrough} from "../utilities/eventListeners.js";

const missionList = document.getElementById("missionList");
const missionLabels = {
    "lucky": {
        "text": "Geluksvogels"
    },
    "planned": {
        "text": "Gepland"
    },
    "successful": {
        "text": "Succesvol"
    },
    "crashed": {
        "text": "Gecrasht"
    }
};
export default async function loadSearchPage() {
    updateMissions();

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", async function(event) {
        const query = event.target.value;
        updateMissions(true, query);
    });
}

async function updateMissions(filter = false, query = "") {
    // Get the missions
    const missions = await apiClient.missions.list();

    // Filter the missions
    let missionsToUse = (filter && query !== "") ? await filterMissions(missions, query) : missions;

    // Clear the mission list
    await clearMissions();

    // Add the filtered missions to the list
    missionsToUse.forEach(mission => addMission(mission));

    // Register clickthrough on the mission cards
    registerMissionDetailClickthrough();
}

async function filterMissions(missions, query) {
    return missions.filter(mission => {
        let joinedColumns = `${mission.name} ${missionLabels[mission.status].text} ${mission.description}`;
        return joinedColumns.toLowerCase().includes(query.toLowerCase());
    });
}

async function clearMissions() {
    missionList.innerHTML = "";
}


async function addMission(mission) {
    const dateFormattingOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    missionList.innerHTML += `
        <tr>
            <td>${mission.id}</td>
            <td><a href="#" class="mission-clickthrough" data-mission-id="${mission.id}">${mission.name}</a></td>
            <td class="text-truncate">${(mission.description.length > 50) ? mission.description.substring(0,50) + '...' : mission.description }</td>
            <td><span class="badge w-100 ${mission.status}">${missionLabels[mission.status].text}</span></td>
            <td>${formatDate(mission.launchDate)}</td>
            <td>${mission.fuelRequired}</td>
        </tr>`;
}