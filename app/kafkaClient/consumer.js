// import the `Kafka` instance from the kafkajs library
const { Kafka } = require("kafkajs");
const io = require("socket.io")(5000);

// the client ID lets kafka know who's producing the messages
const clientId = "my-app";
// we can define the list of brokers in the cluster
const brokers = ["localhost:9092"];
// this is the topic to which we want to write messages
const topic = "logs";
const kafka = new Kafka({ clientId, brokers });

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })  
    io.on("connect",async socket => {
        console.log('connecting...');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log('from sockets'+{message});
                socket.send(message);
            },
          })      
      });
}
run().catch(console.error);
module.exports = run;
