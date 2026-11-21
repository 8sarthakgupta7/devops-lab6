const test = require("node:test");
const assert = require("node:assert/strict");
const { createServer, greet } = require("../src/app");

async function start() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  return { server, base: `http://127.0.0.1:${port}` };
}

test("greet returns a greeting", () => {
  assert.equal(greet("DevOps"), "Hello, DevOps!");
  assert.equal(greet(), "Hello, world!");
});

test("GET /health returns ok", async (t) => {
  const { server, base } = await start();
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("unknown path returns 404", async (t) => {
  const { server, base } = await start();
  t.after(() => {
    server.closeAllConnections();
    server.close();
  });
  const res = await fetch(`${base}/missing`);
  assert.equal(res.status, 404);
});
