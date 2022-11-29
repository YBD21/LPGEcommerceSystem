const express = require('express')
const app = express()
const port = 5000

app.get('/Test_login', (req, res) => {
  res.json({"Test" : ["User Logged in "]})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})