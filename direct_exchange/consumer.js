const amqp = require("amqplib")
const directRoutes = process.argv.slice(2)
const exchangeName = "directMessage"
async function receive_Data (){
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    channel.assertExchange(exchangeName,"direct")
    const assertedQueue = await channel.assertQueue("",{exclusive:true})
    console.log(' [*] Waiting for logs. To exit press CTRL+C');
    directRoutes.map(route=>{
        channel.bindQueue(assertedQueue.queue,exchangeName,route)
    })
        channel.consume(assertedQueue.queue,(msg)=>{
        if(msg.content) console.log("Routing Key[%s]: '%s'", msg.fields.routingKey, msg.content.toString());
    })
}

receive_Data()