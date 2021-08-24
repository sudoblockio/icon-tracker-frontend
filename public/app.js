const express = require('express')
const path = require('path')
const port = 3000
const app = express()

app.use(express.static(__dirname + '/'))
app.get('*', function (request, response){
  console.log(request, "request")
  response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(port)
