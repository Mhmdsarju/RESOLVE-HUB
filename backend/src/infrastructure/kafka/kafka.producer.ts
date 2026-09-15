import { Producer } from "kafkajs";
import { kafka } from "./kafka.config";
import { IEventPublisher } from "@/modules/organization/domain/interfaces/IEventPublisher";


// export const kafkaProducer: Producer = kafka.producer();

export class KafkaProducer implements IEventPublisher{
    private readonly producer: Producer;

    constructor() {
        this.producer = kafka.producer();
    }

    async connect(): Promise<void> {
        await this.producer.connect();
    }

    async publish(topic: string, message: unknown): Promise<void> {

        await this.producer.send({
            topic,
            messages: [{
                value: JSON.stringify(message)
            }
            ]
        })

    }

    async disconnect():Promise<void>{
        await this.producer.disconnect();
    }


}