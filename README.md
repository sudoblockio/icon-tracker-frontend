# ICON Tracker

### Development Setup

##### Install Modules

You can install modules with npm:

```sh
# Install dependencies
npm install
```

##### Run development mode:

```sh
npm start
```

### Build

##### Run build:

```sh
# build files to './build'
npm run build
```

### Set API URL

1. First, You can set Tracker and Wallet API URL in script.
```sh
# set Tracker and Wallet API URL separately
TRACKER_API_URL=[CUSTOM_URL] WALLET_API_URL=[CUSTOM_URL] npm run build
```

2. Second, You can set Tracker and Wallet API URL in config.json.
if you set both script and config.json, url is script will be applied.
```json
{
    "TRACKER_API_URL":"CUSTOM_URL",
    "WALLET_API_URL":"CUSTOM_URL"
}
```

3. Third, if the custom configuaration is not detected, each url is set to default value
> TRACKER_API_URL: https://tracker.icon.foundation (production) / http://trackerlocaldev.icon.foundation (development)
> WALLET_API_URL: http://trackerlocaldev.icon.foundation
