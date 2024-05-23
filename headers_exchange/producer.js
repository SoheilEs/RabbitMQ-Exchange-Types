const amqp = require("amqplib")
const exchangeName = "headersMessage"
async function sendData (){
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    await channel.assertExchange(exchangeName,"headers")
    channel.publish(exchangeName,'',Buffer.from("Hello world"),{headers:{
        author:"Soheil Isazade",
        runtime:"node.js",
        price: 650,
        comments:[]
    }} )
    setTimeout(()=>{
        connection.close()
        process.exit(0)
    },1000)
}

sendData()