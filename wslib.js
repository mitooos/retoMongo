const WebSocket = require("ws");
const messagesController = require("./controllers/messagesController");

const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", async (message) => {
      let parsedMessage = JSON.parse(message);
      parsedMessage.ts = Date.now();
      await messagesController.createMessage(parsedMessage);
      sendMessages();
    });
  });
};

const sendMessages = async () => {
  let messages = await messagesController.getMessages();
  clients.forEach((client) => client.send(JSON.stringify(messages)));
};

module.exports.sendMessages = sendMessages;

exports.wsConnection = wsConnection;
