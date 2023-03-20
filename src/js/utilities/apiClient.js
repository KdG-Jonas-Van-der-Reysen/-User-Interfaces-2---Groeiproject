const baseUrl = "http://localhost:3000";

function url(path) {
    return `${baseUrl}${path}`;
}
export default {
    missions: {
        list: async() => {
            const response = await fetch(url("/spaceMissions"));
            return await response.json();
        },
        get: async(missionId) => {
            const response = await fetch(url(`/spaceMissions/${missionId}`));
            return await response.json();
        },
        add: async(mission) => {
            return await fetch(url("/spaceMissions"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mission)
            });
        },
        edit : async(mission) => {
            return await fetch(url(`/spaceMissions/${mission.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mission)
            });
        },
        delete: async(missionId) => {
            return await fetch(url(`/spaceMissions/${missionId}`), {
                method: "DELETE"
            });
        }
    },
    astronauts: {
        fromMission: async(missionId) => {
            const response = await fetch(url(`/spaceMissions/${missionId}/astronauts`));
            return await response.json();
        },
        list: async() => {
            const response = await fetch(url("/astronauts"));
            return await response.json();
        },
        get: async(astronautId) => {
            const response = await fetch(url(`/astronauts/${astronautId}`));
            return await response.json();
        },
        edit : async(astronaut) => {
            return await fetch(url(`/astronauts/${astronaut.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(astronaut)
            });
        },
    }
}