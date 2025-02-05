function getEventsByName(ABI) {
    const eventsByName = {};

    const baseMethods = [{
        name: "ICXTransfer", type: "eventlog",
        inputs: [
            { type: "address", name: "_to" },
            { type: "address", name: "_from" },
            { type: "int", name: "amount" }
        ]
    }]

    const AbiWithBaseMethods = [...ABI, ...baseMethods]
    AbiWithBaseMethods.forEach(item => {
        const { type, name } = item;
        if (type === "eventlog") {
            eventsByName[name.toLowerCase()] = item;
        }
    })
    return eventsByName;
}


function getParsedLog(log, eventsByName) {
    const parsedResult = {};

    try {
        const parsedResult = {};

        const indexedData = JSON.parse(log.indexed);
        const eventName = indexedData[0].split("(")[0];
        const indexedValues = indexedData.slice(1);
        const nonIndexedValues = JSON.parse(log.data)

        // Get event signature from the provided events map
        const eventABI = eventsByName[eventName.toLowerCase()];
        const eventABIInputs = eventABI?.inputs || [];

        const params = [];

        // Extract indexed parameters
        if (indexedValues) {
            let indexedFinished = false;
            let inputIndex = 0;
            while (!indexedFinished) {
                const currentInput = eventABIInputs[inputIndex];
                const currentValue = indexedValues[inputIndex];

                if (!currentValue) {
                    indexedFinished = true;
                } else {
                    params.push({ ...currentInput, value: currentValue });
                    inputIndex++;
                }
            }
        }

        // Extract non-indexed parameters
        if (nonIndexedValues) {
            let nonIndexedCounter = 0;
            for (let i = 0; i < eventABIInputs.length; i++) {
                const currentInput = eventABIInputs[i];
                const currentValue = nonIndexedValues[nonIndexedCounter++];
                params.push({ ...currentInput, value: currentValue });
            }
        }

        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            try {
                if (param.value !== undefined && param.value !== null) {
                    let formattedValue = param.value;
                    if (param.type === "int") {
                        switch (param.name) {
                            case "amount":
                            case "rewards":
                                formattedValue = parseFloat((param.value / 1e18).toFixed(4));
                                break;
                            default:
                                formattedValue = Number(param.value);
                                break;
                        }
                    }
                    if (param.name) {
                        parsedResult[param.name] = formattedValue;
                    }
                }
            } catch (err) {
                console.log("Error while creating param while parsing log", err)
                continue;
            }
        }

        return parsedResult;

    } catch (err) {
        console.error("Error while parsing log", err)
    }

    return parsedResult;
}




function getParsedLogs(arrLog, ABI) {
    const eventsByName = getEventsByName(ABI);
    return arrLog.map(log => getParsedLog(log, eventsByName));
}

module.exports = { getParsedLog, getParsedLogs, getEventsByName }

