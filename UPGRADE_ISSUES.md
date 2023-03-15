# Issues with upgrade 

## Steps taken 

- Upgraded to node 18 in dockerfile 
- Replaced `COPY . .` with copying over individual files / directories 
- Ran a `yarn upgrade` on the node modules  
- Made many fixes to `webpack.config.js` 
  - Need to inspect diff to see 
  - Also added `config/webpack/environment.js`
- Updated `src/routes.js` and `src/App.js` based on new react conventions 
- Added `.eslintrc.json`

## Issues 

- Current issue is around the `loose` mode 
- Getting lots of errors around "loose"
    - [babel/babel/issues/11622](https://github.com/babel/babel/issues/11622)
        - [Links to assumptions fix](https://babeljs.io/docs/assumptions)
            - This is supposed to enable loose mode which was a log
    - [rails/webpacker/issues/3008](https://github.com/rails/webpacker/issues/3008)

- React upgrades 
  - `yarn add react-router-dom@5.2.0` -> [SO Issue](https://stackoverflow.com/a/70310577/12642712)
  - New react syntax
    - [SO Issue](https://stackoverflow.com/a/69849271/12642712)
    - Changes to `Routes.js`

- Webpack config 
  - [Issue with regexp](https://stackoverflow.com/questions/74193147/webpack-5-21-2-invalid-options-object-ignore-plugin-has-been-initialized-using)
    - Line 560 + 561

- Babel 
  - Added packages 
    ```shell
    yarn add @babel/plugin-proposal-private-property-in-object
    yarn add @babel/plugin-proposal-private-methods
    yarn add @babel/plugin-proposal-class-properties
    yarn add @babel/plugin-proposal-private-methods
    ```

## Recommended steps

- Run this version side by side with the old version and step into the changes that were made incrementally
- Modify the Dockerfile first to not accidentally copy in a local `node_modules` directory
- Consider downgrading node to 16 instead of 18
    - Fewer differences, could be better
- When doing a `yarn upgrade`, be very careful
    - Lots of diffs from this
- Make sure to consider all the changes in webpack config and package.json
    - This is obvious but be very careful when looking at the changes here as this is 100% the issue
- Check the version of all the babel packages in packages.json

## `loose` mode

```json
  "assumptions": {
"assumptions": {
"setPublicClassFields": true,
"privateFieldsAsSymbols": true
},
}
```