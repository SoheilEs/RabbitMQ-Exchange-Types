const amqp = require("amqplib");
const exchangeName = "logs"


async function receive_logs(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        console.log("Connecting to RabbitMQ");
        const channel = await connection.createChannel()
        await channel.assertExchange(exchangeName,"fanout")
       const queueResult = await channel.assertQueue('',{exclusive:true})
       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueResult.queue)
       await channel.bindQueue(queueResult.queue,exchangeName,'')
       channel.consume(queueResult.queue,(msg)=>{
        if(msg.content) console.log(" [x] %s", msg.content.toString());
        channel.ack(msg)
       })

    }catch(err){
        console.log(err);
    }

}

receive_logs()