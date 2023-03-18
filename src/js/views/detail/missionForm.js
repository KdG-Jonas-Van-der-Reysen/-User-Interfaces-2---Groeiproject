export default async function loadMission(id) {
    let missionErrorMessage = document.getElementById("statusNotification");
    let apiResponse = null;
    let mission = null;

    try {
        apiResponse = await fetch(`http://localhost:3000/spacemissions/${id}`);
        mission = await apiResponse.json();

        // Clear the error message
        missionErrorMessage.classList.add("d-none");

        // Fill the form fields
        fillField("missionId", mission.id)
        fillField("missionName", mission.name);
        fillField("missionDescription", mission.description);
        fillField("missionLaunchDate", mission.launchDate);
        fillField("status", mission.status);
        fillField("missionImageUrl", mission.missionImage);
        fillField("missionFuel", mission.fuelRequired);

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

function fillField(fieldId, value) {
    document.getElementById(fieldId).value = value;
}