const mqtt = require("mqtt");

const mqttClient = mqtt.connect("ws://localhost:8083/mqtt",{
    username:'admin',password:'public'
});

const clientTopic = 'customClientTopic';
const publishTopic = 'customPublishTopic';

mqttClient.on('connect',()=>{
    console.log('client connected');

    mqttClient.publish(clientTopic,JSON.stringify({plugged:true}))

    mqttClient.subscribe(publishTopic);

    setTimeout(() => {
        mqttClient.publish(clientTopic,JSON.stringify({plugged:false}));
    }, 10000);
})

mqttClient.on('message',(topic,payload)=>{
    console.log('topic: ',topic.toString());
    console.log('payload: ',JSON.parse(payload));
});