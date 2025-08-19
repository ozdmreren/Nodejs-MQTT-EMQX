const mqtt = require('mqtt');

const mqttClient = mqtt.connect('ws://localhost:8083/mqtt',{
    username:'admin',password:'public'
});

const clientTopic = 'customClientTopic';
const publishTopic = 'customPublishTopic';

let charging = false;
mqttClient.on('connect',()=>{
    console.log('server connected');

    mqttClient.subscribe(clientTopic);

    setInterval(() => {
        mqttClient.publish(publishTopic,JSON.stringify({id:8888,name:"TeslaX",charging:charging}));
    },3000);
    
    //mqttClient.end();
})

mqttClient.on('message',(topic,payload)=>{
    let jsonResult= JSON.parse(payload);
    let plugged = jsonResult['plugged'];

    console.log("topic: ",topic);
    console.log("plugged: ",jsonResult);

    if(plugged){
        charging = true;
    }else{
        charging = false;
    }
})
