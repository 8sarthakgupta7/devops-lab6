const http = require("node:http");

const VERSION = process.env.APP_VERSION || "dev";

const PRODUCTS = [
  { id: 1, name: "Wireless Mouse", price: 799 },
  { id: 2, name: "USB-C Cable", price: 299 },
  { id: 3, name: "Laptop Stand", price: 1499 },
];

function greet(name) {
  return `Hello, ${name || "world"}!`;
}

function send(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function handler(req, res) {
  if (req.url === "/") {
    send(res, 200, { app: "ShopEasy Lite", message: greet("shopper"), version: VERSION });
  } else if (req.url === "/products") {
    send(res, 200, PRODUCTS);
  } else if (req.url === "/health") {
    send(res, 200, { status: "ok", version: VERSION });
  } else {
    send(res, 404, { error: "not found" });
  }
}

function createServer() {
  return http.createServer(handler);
}

module.exports = { createServer, greet };
