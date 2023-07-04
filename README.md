# ICON Tracker

[![loopchain](https://img.shields.io/badge/ICON-API-blue?logoColor=white&logo=icon&labelColor=31B8BB)](https://shields.io) 
[![GitHub Release](https://img.shields.io/github/release/sudoblockio/icon-tracker-frontend.svg?style=flat)]() 
![](https://github.com/sudoblock/icon-tracker-frontend/workflows/push-main/badge.svg?branch=main) 
![](https://img.shields.io/github/license/sudoblockio/icon-tracker-frontend)

[//]: # ([![codecov]&#40;https://codecov.io/gh/sudoblockio/icon-tracker-frontend/branch/main/graph/badge.svg&#41;]&#40;https://codecov.io/gh/sudoblockio/icon-tracker-frontend&#41;)
[//]: # (![Uptime]&#40;https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fgeometry-labs%2Ficon-status-page%2Fmaster%2Fapi%2Fdev-tracker-frontend-service%2Fuptime.json&#41; )

### Development Setup

##### Install Modules

You can install modules with npm:

```sh
# Install dependencies
npm install
```

##### Run development mode:

**Mainnet** 
```sh
npm start
```

**Testnets**
```shell
npm run start --network=lisbon
```

**Custom**
```shell
npm run start \
  --rpc-endpoint=https://lisbon.net.solidwallet.io \
  --api-endpoint=https://tracker.lisbon.icon.community/ \
  --wss-endpoint=wss://tracker.lisbon.icon.community/ \
  --nid=42
```

Note: In order to run a full tracker on a custom network, you need to also run an indexer on that network. See the [icon-tracker](https://github.com/sudoblockio/icon-tracker). 

In short, you will need to configure the docker compose to point to a custom goloop node and run the whole stack. From there you will have an exposed IP running the APIs which you need to then set within these variables. 

Better directions and tooling exist within the [icon-tracker](https://github.com/sudoblockio/icon-tracker) repo. 

### Build:

```sh
# build files to './build'
npm run build
```

### Test:

**Unit**
```sh
npm run test
```

**e2e**

The e2e tests run with selenium and pytest. To run them, you will first need to have
 python installed with the virtual environment module. Then run: 

```shell
# Install e2e test dependencies (pytest / selenium)
python3 -m venv env
source env/bin/activate
pip install -r e2e/requirements.txt
# Run the application 
npm run start 
# Then you can run the tests 
make test-e2e
```

### Set Endpoints 

1. Command line - Also see custom network above

```shell
npm run start --network=berlin
```

2. Environment Variables

```shell
export \
  REACT_APP_RPC_ENDPOINT=https://lisbon.net.solidwallet.io \
  REACT_APP_API_ENDPOINT=https://tracker.lisbon.icon.community/ \
  REACT_APP_WSS_ENDPOINT=wss://tracker.lisbon.icon.community/ \
  REACT_APP_NID=42
```

3. `.env` File 

**./.env** 

```dotenv
REACT_APP_RPC_ENDPOINT=https://lisbon.net.solidwallet.io
REACT_APP_API_ENDPOINT=https://tracker.lisbon.icon.community/
REACT_APP_WSS_ENDPOINT=wss://tracker.lisbon.icon.community/
REACT_APP_NID=42
```
