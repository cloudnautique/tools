const { api } = require('@pagerduty/pdjs');
const { getAllIncidents, getIncident } = require('./src/incidents.js');

if (process.argv.length !== 3) {
    console.error('Usage: node index.js <command>')
    process.exit(1)
}

const command = process.argv[2]
let token = process.env.PAGERDUTY_BEARER_TOKEN
let tokenType = "bearer"
if (token === undefined || token === "") {
    token = process.env.PAGERDUTY_API_TOKEN
    tokenType = "token"
}

if (token === undefined || token === "") {
    console.error('Please set the PAGERDUTY_BEARER_TOKEN or PAGERDUTY_API_TOKEN environment variable')
    process.exit(1)
}

const pd = api({ token: token, tokenType: tokenType });

async function main() {
    try {
        switch (command) {
            case "getAllIncidents":
                console.log("calling getAllIncidents");
                const things = await getAllIncidents(pd);
                console.log("THINGS: ", things);
                break
            case "getIncident":
                const incidentId = process.env.INCIDENT_ID;
                if (incidentId === undefined || incidentId === "") {
                    console.error('Please set the INCIDENT_ID environment variable')
                    process.exit(1)
                }
                console.log(`getIncident(${incidentId})`);
                const incident = await getIncident(pd, incidentId);
                console.log("INCIDENT: ", incident);
                break
            default:
                console.log(`Unknown command: ${command}`)
                process.exit(1)
        }
    } catch (error) {
        // We use console.log instead of console.error here so that it goes to stdout
        console.log("Got an unknown error: ", error);
    }
}

main()