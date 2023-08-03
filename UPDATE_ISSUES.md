# SUMMARY

The following is a summary of the changes made in the tracker repo,  all the issues related to old versions of packages being used currently in the ICON tracker frontend and commentary on the things that are still needed to be done.

## Description of changes made.

A new empty project was bootstrapped with CRA 5 and the entire codebase of the tracker was then copy to the blank project.

Packages were updated and/or installed accordingly to resolve the issues encountered on first run.

A detailed description of the changes in the packages is shown in the "List of updated packages" section.

Due to the project being bootstraped with CRA 5 the scripts inside the `./scripts/` folders are not needed.
* The `run` command was tested successfully,
* the `test` command was executed, issues fixed and it runs correctly.
* The `build` command was executed and it runs and builds (it finish the build process) but it needs to be checked in production

## Issues still to resolve

* react-router-redux package is deprecated and no longer mantained (https://github.com/reactjs/react-router-redux)
* current version being use of react-redux (v5.0.6) doesnt support latest version of react, the latest version that is able to support is v16
* In order to update to latest react version is necessary to update react-redux. Doing this will require major refactoring to the code in regards with the state management of the app using redux.
* tried using latest version of react-redux (v8.1.1). Had many bugs related to the dispatch of internal events using redux, couldnt debug without major refactoring of the code.
* need to update icon-sdk-js current version is 0.0.15. Updating to latest version will break the current code

## Changes made in packages

The following is a detailed description of the changes made in the packages for the project.

* Unchanged packages count: 6
* New packages added count: 5
* Updated pacakges count: 24
* Removed packages count: 58

### Unchanged packages

"deepcopy": "^2.1.0",
"icon-sdk-js": "0.0.15",
"object-assign": "^4.1.1",
"path": "^0.12.7",
"redux-localstorage": "^0.4.1",
"redux-logger": "^3.0.6",

### New packages

"@ledgerhq/hw-transport-webhid": "^6.27.17",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/user-event": "^13.5.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4",

### updated packages

"axios": from "^0.24.0" to  "^1.4.0",
"bignumber.js": from "^7.2.1" to  "^9.1.1",
"chart.js": from "^2.7.2" to "^4.3.2",
"check-iconex": from "0.0.7" to "^0.0.8",
"clipboard": from "^1.7.1" to "^2.0.11",
"dotenv": from "^6.0.0" to "^16.3.1",
"history": from "^4.7.2" to "^5.3.0",
"moment": from "^2.24.0" to "^2.29.4",
"qrcode": from "^1.2.0" to "^1.5.3",
"query-string": from "^5.1.1" to "^8.1.0",
"react": from "^16.2.0" to "^16.14.0",
"react-body-classname": from "^1.2.0" to "^1.3.1",
"react-dom": from "^16.2.0" to "^16.14.0",
"react-dropzone": from "^10.1.5" to "^14.2.3",
"react-icons": from "^4.7.1" to "^4.10.1",
"react-json-beautify": "^1.0.0",
"react-redux": from "^5.0.6" to "^5.1.2",
"react-router-dom": from "^4.2.2" to "^4.3.1",
"react-router-redux": "^5.0.0-alpha.9",
"redux": from "^3.7.2" to "^4.2.1",
"redux-devtools-extension": from "^2.13.2" to "^2.13.9",
"redux-saga": from "^0.16.0" to "^1.2.3",
"sass": from "^1.53.0" to "^1.64.1",
"web3-utils": from "^1.0.0-beta.34" to "^4.0.3"

### removed packages

"@babel/core": "7.2.2",
"@svgr/webpack": "4.1.0",
"autoprefixer": "7.1.6",
"babel-core": "7.0.0-bridge.0",
"babel-eslint": "9.0.0",
"babel-jest": "23.6.0",
"babel-loader": "8.0.5",
"babel-plugin-named-asset-import": "^0.3.1",
"babel-plugin-transform-remove-console": "^6.9.4",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react-app": "^7.0.2",
"bfj": "6.1.1",
"case-sensitive-paths-webpack-plugin": "^2.2.0",
"chalk": "1.1.3",
"css-loader": "1.0.0",
"dotenv-expand": "4.2.0",
"env-cmd": "^10.1.0",
"eslint": "5.12.0",
"eslint-config-react-app": "^3.0.8",
"eslint-loader": "2.1.1",
"eslint-plugin-flowtype": "2.50.1",
"eslint-plugin-import": "2.14.0",
"eslint-plugin-jsx-a11y": "6.1.2",
"eslint-plugin-react": "7.12.4",
"express": "^4.16.3",
"file-loader": "2.0.0",
"fs-extra": "7.0.1",
"html-webpack-plugin": "^4.0.0-alpha.2",
"identity-obj-proxy": "3.0.0",
"jest": "23.6.0",
"jest-pnp-resolver": "1.0.2",
"jest-resolve": "23.6.0",
"jest-watch-typeahead": "^0.2.1",
"js-beautify": "^1.7.5",
"mini-css-extract-plugin": "0.5.0",
"node": "^16.0.0",
"optimize-css-assets-webpack-plugin": "5.0.1",
"pnp-webpack-plugin": "1.2.1",
"postcss-flexbugs-fixes": "4.1.0",
"postcss-loader": "3.0.0",
"postcss-preset-env": "6.5.0",
"postcss-safe-parser": "4.0.1",
"promise": "8.0.1",
"raf": "3.4.0",
"react-app-polyfill": "^0.2.2",
"react-dev-utils": "^8.0.0",
"react-test-renderer": "^16.0.0",
"react-to-print": "^2.5.0",
resolve": "^1.10.0",
"sass-loader": "^10.1.1",
"style-loader": "0.23.1",
"terser-webpack-plugin": "1.2.2",
"url-loader": "1.1.2",
"webpack": "4.36.0",
"webpack-dev-server": "3.1.14",
"webpack-manifest-plugin": "2.0.4",
"whatwg-fetch": "2.0.3",
"workbox-webpack-plugin": "3.6.3"

## Reference links
* https://github.com/facebook/create-react-app/discussions/10239
* https://github.com/remix-run/react-router/issues/5751
* https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
* https://stackoverflow.com/questions/51703620/react-router-redux-vs-connected-react-router-for-react-v4
* https://stackoverflow.com/questions/72220065/how-to-create-a-new-project-based-on-react17
* https://stackoverflow.com/questions/46566830/how-to-use-create-react-app-with-an-older-react-version
* https://stackoverflow.com/questions/70594326/how-to-go-back-to-react-router-v5-from-react-router-v6-for-nested-dashboard
* https://github.com/solana-labs/wallet-adapter/issues/499
