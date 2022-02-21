const express = require('express')
const app = express()
const req = require('express/lib/request');
const res = require('express/lib/response');
const port=3001

app
    .get('/',(req, res) =>{
  res.send('You are on my homepage');
    })
    .get('/about',(req, res) =>{
      res.send('k You');
        })

        app.listen(port,()=>{
console.log(`Example app listening at http://${app}:${port}`)
        })