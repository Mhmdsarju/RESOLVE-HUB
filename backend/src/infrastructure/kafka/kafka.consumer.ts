import { Consumer } from "kafkajs";

import {kafka} from "./kafka.config";


export class KafkaConsumer{
    private readonly consumer:Consumer;

    constructor(groupId:string){
        this.consumer=kafka.consumer({groupId});
    }

    async connect():Promise<void>{
        await this.consumer.connect();
    }

    async subscribe(topic:string):Promise<void>{
        await this.consumer.subscribe({
            topic,
            fromBeginning:false // start with new evnt
        })
    }

    async consume(handlers:Record<string,(message:string)=>Promise<void>>):Promise<void>{


        await this.consumer.run({
            eachMessage:async({topic,message})=>{
                if(!message.value){
                    return;
                }

                const handler=handlers[topic];

                if(!handler){
                    console.log(`No handler found for topic: ${topic}`);
                    return;
                }

                await handler(message.value.toString())

            }
        })
    }


    async disconnect():Promise<void>{
        await this.consumer.disconnect()
    }


}