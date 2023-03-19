import apiClient from "../../utilities/apiClient.js";
import {fillField, formatDate, setHtmlContent, setTextContent} from "../../utilities/commonUI.js";
import {switchToView} from "../../utilities/views.js";
import switchToTab from "../../utilities/tabs.js";

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
    setHtmlContent("detailsStatus",`
        <span class="badge ${missionDetails.status}">
            ${missionLabels[missionDetails.status].text}
        </span>`,
        missionDetails.fuelRequired
    );
    setTextContent("detailsFuel", missionDetails.fuelRequired + ' liter')
}

export async function showMissionDetails(missionId) {
    await loadMissionDetails(missionId);
    switchToView("missionDetails");
    switchToTab("detail")
}