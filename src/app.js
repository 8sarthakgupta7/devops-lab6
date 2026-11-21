const http = require("node:http");

function greet(name) {
  return `Hello, ${name || "world"}!`;
}

function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  if (req.url === "/") {
    res.writeHead(200);
    res.end(JSON.stringify({ message: greet("DevOps"), version: "1.0.0" }));
  } else if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok" }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "not found" }));
  }
}

function createServer() {
  return http.createServer(handler);
}

module.exports = { createServer, greet };
