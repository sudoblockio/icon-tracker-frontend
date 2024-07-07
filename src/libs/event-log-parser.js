function getEventsByName(ABI) {
    const eventsByName = {};
    ABI.forEach(item => {
        const { type, name } = item;
        if (type === "eventlog") {
            eventsByName[name.toLowerCase()] = item;
        }
    })

    return eventsByName;
}


function getParsedLog(log, eventsByName) {
    const indexed = JSON.parse(log.indexed);
    const eventName = indexed[0].split("(")[0];
    const paramValues = indexed.splice(1);
    const logSignature = eventsByName[eventName.toLowerCase()];


    const parsed = {};

    const params = logSignature.inputs.map((input, index) => ({ ...input, value: paramValues[index] }))
    params.forEach(item => {
        if (item.value) {
            let value = item.value;

            if (item.type === "int") {
                if (item.name !== "blockHeight" && item.name !== "block_height") {
                    value = parseFloat(Number(item.value / Math.pow(10, 18)).toFixed(4))
                } else {
                    value = Number(item.value)
                }
            }

            parsed[item.name] = value;

        }
    })

    return parsed;
}



function getParsedLogs(arrLog, ABI) {
    const eventsByName = getEventsByName(ABI);
    return arrLog.map(log => getParsedLog(log, eventsByName));
}

module.exports = { getParsedLog, getParsedLogs, getEventsByName }

