export default async function loadDetailsPage() {
    // Register clickthrough on the add mission button
    const addMissionButton = document.getElementById('btnAddMissionView');
    addMissionButton.addEventListener('click', () => {
        const form = document.getElementById('missionDetails');
        document.getElementById("missionId").value = "";
        form.reset();

        document.getElementById("submitMission").innerHTML = "Missie toevoegen";
        document.querySelector("#loadDetailsPage>h1").textContent = "Missie toevoegen";
    });

    // Register the click on the submit button
    const submitMissionButton = document.getElementById('submitMission');

    submitMissionButton.addEventListener('click', async (e) => {
        e.preventDefault();

        if (document.getElementById("missionId").value === "") {
            alert("Mission id is empty");
            await addMission();
        } else {
            alert("Mission id is not empty");
            await addMission();

            // await updateMission();
        }
    });

}

function getInputValue(fieldName) {
    return document.getElementById("mission" + fieldName).value;
}

function verifyNotEmpty(fieldName, value) {
    if (value === "") {
        const errorElement = document.getElementById(`mission${fieldName}Error`);

        errorElement.textContent = `Het veld ${fieldName} mag niet leeg zijn`;
        errorElement.classList.remove("d-none");

        return false;
    }
    return true;
}

async function addMission() {
    let missionDetails = {
        name: getInputValue("missionName"),
        launchDate: getInputValue("LaunchDate"),
        status: getInputValue("Status"),
        fuelRequired: parseFloat(getInputValue("Fuel")),
        missionImage: getInputValue("ImageUrl"),
        description: getInputValue("Description")
    }

    // Make sure nothing is empty by putting it into an array first
    const validationResults = [
        verifyNotEmpty("missionName", missionDetails.name),
        verifyNotEmpty("LaunchDate", missionDetails.launchDate),
        verifyNotEmpty("Status", missionDetails.status),
        verifyNotEmpty("Fuel", missionDetails.fuelRequired),
        verifyNotEmpty("ImageUrl", missionDetails.missionImage),
        verifyNotEmpty("Description", missionDetails.description)
    ];

    // If any of the validation results is false, return
    if (validationResults.includes(false)) {
        return;
    }

    // Send the data to the API
    const apiResponse = await fetch("http://localhost:3000/spacemissions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(missionDetails)
    });

    // If the response is not ok, show the error message
    if (!apiResponse.ok) {
        const missionErrorMessage = document.getElementById("statusNotification");

        missionErrorMessage.classList.add("alert-danger");
        missionErrorMessage.textContent = "Er is iets misgelopen bij het opslaan van de missie, probeer het aub later opnieuw."
        missionErrorMessage.classList.remove("d-none");
    } else {
        // Show the success message
        const missionSuccessMessage = document.getElementById("statusNotification");

        missionSuccessMessage.classList.add("alert-success");
        missionSuccessMessage.classList.remove("d-none");
        missionSuccessMessage.classList.remove("alert-danger");
        missionSuccessMessage.textContent = "De missie is succesvol toegevoegd.";

        // Reset the form
        const form = document.getElementById('missionDetails');
        form.reset();

        // Hide the success message after 3 seconds
        setTimeout(() => {
            missionSuccessMessage.classList.add("d-none");
        }, 3000);
    }
}