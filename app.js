const express = require('express')
const path = require('path')
const port = 3000
const app = express()

// serve static assets normally
app.use(express.static(__dirname + '/'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
