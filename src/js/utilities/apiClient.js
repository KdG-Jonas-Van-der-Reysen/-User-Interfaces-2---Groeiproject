const baseUrl = "http://localhost:3000";

function url(path) {
    return `${baseUrl}${path}`;
}
export default {
    missions: {
        list: async() => {
            const response = await fetch(url("/spacemissions"));
            return await response.json();
        },
        get: async(missionId) => {
            const response = await fetch(url(`/spacemissions/${missionId}`));
            return await response.json();
        },
        add: async(mission) => {
            return await fetch(url("/spacemissions"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mission)
            });
        },
        edit : async(mission) => {
            const missionId = mission.id;
            return await fetch(url(`/spacemissions/${mission.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mission)
            });
        },
        delete: async(missionId) => {
            return await fetch(url(`/spacemissions/${missionId}`), {
                method: "DELETE"
            });
        }
    }
}