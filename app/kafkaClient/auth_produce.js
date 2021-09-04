// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");

// the client ID lets kafka know who's producing the messages
const clientId = "my-app";
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"];
// this is the topic to which we want to write messages
const topic = "auths";

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

// we define an async function that writes a new message each second
async function produce(message, key) {
  await producer.connect();

  // after the produce has connected, we start an interval timer

  try {
    // send a message to the configured topic with
    // the key and value formed from the current value of `i`
    await producer.send({
      topic: "auths",
      messages: [
        {
          key: key,
          value: message,
        },
      ],
    });

    // if the message is written successfully, log it and increment `i`
    console.log("writes: " + message);
    return "writes: " + message;
  } catch (err) {
    console.error("could not write message " + err);
    return "could not write message " + err;
  }
}

module.exports = produce;
