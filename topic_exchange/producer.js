const amqp = require("amqplib")
const exchangeName = "topicMessage"
const [logType,message] = process.argv.slice(2)
async function sendData (){
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName,"topic")
    channel.publish(exchangeName,logType,Buffer.from(message) )
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },1000)
}

sendData()