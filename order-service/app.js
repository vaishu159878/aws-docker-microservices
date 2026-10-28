const http = require("http");
const PORT = process.env.PORT || 3002;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    service: "order-service",
    message: "Order Service is running successfully"
  }));
});
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Order Service listening on port ${PORT}`);
});
