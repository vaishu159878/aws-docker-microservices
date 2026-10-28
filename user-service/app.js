const http = require("http");
const PORT = process.env.PORT || 3001;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    service: "user-service",
    message: "User Service is running successfully"
  }));
});
server.listen(PORT, "0.0.0.0", () => {
  console.log(`User Service listening on port ${PORT}`);
});
