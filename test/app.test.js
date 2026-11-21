const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer, greet } = require("../src/app");

async function get(path) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`);
    return { status: res.status, body: await res.json() };
  } finally {
    server.closeAllConnections();
    server.close();
  }
}

test("greet returns a greeting", () => {
  assert.equal(greet("shopper"), "Hello, shopper!");
  assert.equal(greet(), "Hello, world!");
});

test("GET / identifies the app", async () => {
  const { status, body } = await get("/");
  assert.equal(status, 200);
  assert.equal(body.app, "ShopEasy Lite");
});

test("GET /products returns the catalogue", async () => {
  const { status, body } = await get("/products");
  assert.equal(status, 200);
  assert.equal(body.length, 3);
  assert.equal(body[0].name, "Wireless Mouse");
});

test("GET /health returns ok", async () => {
  const { status, body } = await get("/health");
  assert.equal(status, 200);
  assert.equal(body.status, "ok");
});

test("unknown path returns 404", async () => {
  const { status } = await get("/missing");
  assert.equal(status, 404);
});
