var cors = require("cors");

const Koa = require("koa"); // facilitar a criação de aplicações
const http = require("http"); //subir um servidor e escutar uma porta
const socket = require("socket.io"); //abrir a conexão socket

const app = new Koa();
const server = http.createServer(app.callback());

const io = socket(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
}); //integração do socket com o server

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;

io.on("connection", (socket) => {
  console.log("[IO] Conexão => Há uma nova conexão");

  socket.on("chat.message", (data) => {
    console.log("[SOCKET] Chat.message =>", data);
    io.emit("chat.message", data);
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => Uma conexão foi desfeita.");
  });
});

//o servidor vai ficar ouvindo a porta "SERVER_HOST:SERVER_PORT"
server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(
    `[HTTP] Listen => Servidor está rodando em http://${SERVER_HOST}:${SERVER_PORT}`
  );
  console.log("[HTTP] Listen => Press CTRL+C to stop it.");
});
