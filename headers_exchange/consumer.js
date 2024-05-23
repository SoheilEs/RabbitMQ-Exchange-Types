const amqp = require("amqplib");
const exchangeName = "headersMessage";

async function receive_Data() {
  const connection = await amqp.connect("amqp://localhost:5672");
  const channel = await connection.createChannel();
  channel.assertExchange(exchangeName, "headers");
  const assertedQueue = await channel.assertQueue("", { exclusive: true });
  console.log(" [*] Waiting for logs. To exit press CTRL+C");
  channel.bindQueue(assertedQueue.queue, exchangeName, "", {
    author: "Soheil Isazade",
    runtime: ".net",
    'x-match' : "all" // any || all
  });
  channel.consume(assertedQueue.queue, (msg) => {
    if (msg.content)
      console.log(
        msg.properties.headers,
        msg.content.toString()
      );
  });
}

receive_Data();
