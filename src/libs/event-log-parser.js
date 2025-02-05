
function getEventsByName(ABI) {
    const eventsByName = {};

    const baseMethods = [
        {
            name: "ICXTransfer", type: "eventlog",
            inputs: [
                { type: "address", name: "_to" },
                { type: "address", name: "_from" },
                { type: "int", name: "amount" }
            ]
        }
    ]

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
    try {
        const parsedResult = {};

        const indexedData = JSON.parse(log.indexed);
        const eventName = indexedData[0].split("(")[0];
        const indexedValues = indexedData.slice(1);
        const nonIndexedValues = JSON.parse(log.data)

        // Get event signature from the provided events map
        const eventABI = eventsByName[eventName.toLowerCase()];

        if (!eventABI) {
            console.warn(`Could not find ABI method ${eventName} in ${log.address}`)
            return null;
        }

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

        // // Extract non-indexed parameters
        // if (nonIndexedValues) {
        //     let nonIndexedCounter = 0;
        //     for (let i = 0; i < eventABIInputs.length; i++) {
        //         const currentInput = eventABIInputs[i];
        //         const currentValue = nonIndexedValues[nonIndexedCounter++];
        //         params.push({ ...currentInput, value: currentValue });
        //     }
        // }


        function getIntValue(hex) {
            const intVal = parseInt(hex, 16);

            if (!isNaN(intVal)) {
                return (intVal / 1e18)
            } else {
                return hex;
            }
        }

        for (const param of params) {
            try {
                if (param.value !== undefined && param.value !== null) {
                    let formattedValue = param.value;
                    if (param.name) {

                        if (param.type === "int") {
                            switch (param.name) {
                                case "amount":
                                case "rewards":
                                    formattedValue = getIntValue(param.value)
                                    break;
                                default:
                                    break;
                            }
                        }

                        parsedResult[param.name] = formattedValue;
                    }
                }
            } catch (err) {
                console.log("Error while creating param while parsing log", err)
                return null;
            }
        }

        return parsedResult;
    } catch (err) {
        console.error("Error while parsing log", err)
        return null;
    }
}




function getParsedLogs(arrLog, ABI) {
    const eventsByName = getEventsByName(ABI);
    return arrLog.map(log => getParsedLog(log, eventsByName));
}

module.exports = { getParsedLog, getParsedLogs, getEventsByName }

