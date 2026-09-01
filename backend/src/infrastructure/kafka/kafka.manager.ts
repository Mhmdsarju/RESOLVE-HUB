import { KafkaConsumer } from "./kafka.consumer";
import { KafkaProducer } from "./kafka.producer";
import { TaskEventHandler } from "./handlers/taskEvent.handler";
import { KafkaTopics } from "./kafka.topics";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";

export class KafkaManager {

    public readonly producer: KafkaProducer;
    public readonly consumer: KafkaConsumer;

    public readonly taskEventHandler: TaskEventHandler;

    constructor(
        userRepository: IUserRepository,
        createNotificationUseCase: ICreateNotificationUseCase
    ) {
        this.producer = new KafkaProducer();
        this.consumer = new KafkaConsumer("resolvehub-consumer");
        this.taskEventHandler = new TaskEventHandler(
            userRepository,createNotificationUseCase
        );
    };

    async connect(): Promise<void> {
        await this.producer.connect();
        await this.consumer.connect();

        await this.consumer.subscribe(KafkaTopics.TASK_EVENTS);

        await this.consumer.consume(
            this.taskEventHandler.handle.bind(this.taskEventHandler)
        )

    }

    async disconnect(): Promise<void> {
        await this.consumer.disconnect();
        await this.producer.disconnect();
    }

}