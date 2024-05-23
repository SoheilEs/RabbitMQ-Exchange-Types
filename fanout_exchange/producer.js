const amqp = require("amqplib");
const exchangeName = "logs"


async function emit_log(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672")
        console.log("Connecting to RabbitMQ");
        const channel = await connection.createChannel()
        await channel.assertExchange(exchangeName,"fanout")
        channel.publish(exchangeName,'',Buffer.from("Hello world"))
        setTimeout(()=>{
            connection.close()
            process.exit(0)
        },1000)

    }catch(err){
        console.log(err);
    }

}

emit_log()