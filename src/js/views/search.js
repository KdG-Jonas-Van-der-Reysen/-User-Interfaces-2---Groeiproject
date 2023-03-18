const missionList = document.getElementById("missionList");
const missionLabels = {
    "lucky": {
        "color": "#e9a049",
        "text": "Geluksvogels"
    },
    "planned": {
        "color": "#49afe9",
        "text": "Gepland"
    },
    "successful": {
        "color": "#67d572",
        "text": "Succesvol"
    },
    "crashed": {
        "color": "#e65249",
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
    const missions = await getMissions();

    // Filter the missions
    let missionsToUse = (filter && query !== "") ? await filterMissions(missions, query) : missions;

    // Clear the mission list
    await clearMissions();

    // Add the filtered missions to the list
    missionsToUse.forEach(mission => addMission(mission));
}

async function getMissions() {
    const response = await fetch('http://localhost:3000/spacemissions');
    return await response.json();
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
            <td>${mission.name}</td>
            <td class="text-truncate">${(mission.description.length > 50) ? mission.description.substring(0,50) + '...' : mission.description }</td>
            <td><span class="badge w-100 ${mission.status}">${missionLabels[mission.status].text}</span></td>
            <td>${new Date(mission.launchDate).toLocaleDateString('nl-be',dateFormattingOptions)}</td>
            <td>${mission.fuelRequired}</td>
        </tr>`;
}