
async function getAllIncidents(client) {
    try {
        const resp = await client.get('/incidents');
        return resp.resource;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getIncident(client, id) {
    try {
        const resp = await client.get(`/incidents/${id}`);
        return resp.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getAllIncidents,
    getIncident
}