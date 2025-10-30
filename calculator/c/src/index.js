const http = require('http');
const fs = require('fs');
const path = require('path');

const readpath = path.join(__dirname,"../inputs.txt")
const outputpath = path.join(__dirname,"../result.txt")

const server = http.createServer((req, res) => {
  // TODO: Implement your code here
  fs.readFile(readpath,"utf-8",(err,data)=>{
    if(err){
      res.writeHead(500,{"Content-Type" : "text/plain"})
      return res.end("Unable to write result")
    }
    const dat =  data.split("\n")
    let num1 = Number(dat[0])
    let num2 = Number(dat[1])
    let result;
    if(req.url === "/calculate" && req.method === "GET"){

        if(isNaN(num1) || isNaN(num2)){
          res.writeHead(400,{"Content-Type" : "text/plain"})
          return res.end("Invalid Number")
        }

      if(dat[2] === "add"){
        result = num1 + num2
      }
      else if(dat[2] === "subtract"){
        result = num1 - num2
      }
      else if(dat[2] === "multiply"){
        result = num1 * num2
      }
      else if(dat[2] === "divide"){
        if(num2 === 0){
          res.writeHead(400,{"Content-Type" : "text/plain"})
          return res.end("Division by zero")
        }
        result = num1 / num2
      }
      else{
        res.writeHead(400,{"Content-Type" : "text/plain"})
        return res.end("Invalid Operator")
      }
    }
    else{
      res.writeHead(404,{"Content-Type" : "text/plain"})
      return res.end("Not Found")
    }

    fs.writeFile(outputpath,String(result),(err)=>{
      if(err){
      res.writeHead(500,{"Content-Type" : "text/plain"})
      return res.end("Unable to write result")
    }
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end(String(result));
    })
  })
});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
