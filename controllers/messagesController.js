const { mongoClient } = require("../lib/mongo");
const dbName = "chat";
const messagesCollection = "messages";

module.exports.getMessages = async () => {
  let messages = await mongoClient
    .db(dbName)
    .collection(messagesCollection)
    .find()
    .toArray();
  return messages;
};

module.exports.getMessage = async (ts) => {
  let message = await mongoClient
    .db(dbName)
    .collection(messagesCollection)
    .findOne({ ts: ts });

  return message;
};

module.exports.createMessage = async (message) => {
  let result = await mongoClient
    .db(dbName)
    .collection(messagesCollection)
    .insertOne(message);
  return result.ops[0];
};

module.exports.updateMessage = async (updateMessage) => {
  let result = await mongoClient
    .db(dbName)
    .collection(messagesCollection)
    .updateOne({ ts: updateMessage.ts }, { $set: updateMessage });

  return result.result.n;
};

module.exports.deleteMessage = async (ts) => {
  let result = await mongoClient
    .db(dbName)
    .collection(messagesCollection)
    .deleteOne({ ts: ts });
  return result.deletedCount;
};
