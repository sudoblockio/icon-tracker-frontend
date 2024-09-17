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
    const data = JSON.parse(log.data); // values for non indexed field
    const indexed = JSON.parse(log.indexed); // values for indexed field

    const eventName = indexed[0].split("(")[0];
    const paramValues = indexed.splice(1); //indexed


    const logSignature = eventsByName[eventName.toLowerCase()];
    const inputs = logSignature.inputs;


    const params = [];
    const parsed = {};

    let isFinishedIndexed = false;
    let i = 0;
    while (!isFinishedIndexed) {
        const input = inputs[i];
        const value = paramValues[i];
        params.push({ ...input, value })
        if (!value) {
            isFinishedIndexed = true;
        } else {
            i++;
        }
    }

    let counter = 0;
    for (let x = i; x < inputs.length; x++) {
        const input = inputs[x];
        const value = data[counter++]
        params.push({ ...input, value })
    }

    params.forEach(item => {
        if (item.value) {
            let value = item.value;

            if (item.type === "int") {
                if (item.name === "amount" || item.name === "rewards") {
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

