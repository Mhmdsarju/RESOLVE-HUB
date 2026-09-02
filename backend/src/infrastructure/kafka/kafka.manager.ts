import { KafkaConsumer } from "./kafka.consumer";
import { KafkaProducer } from "./kafka.producer";
import { TaskEventHandler } from "./handlers/taskEvent.handler";
import { KafkaTopics } from "../../shared/constant/kafka.topics";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { EmailEventHandler } from "./handlers/emailEvent.handler";
import { IOrganizationEmailService } from "@/modules/organization/domain/interfaces/IOrganizationEmailService";

export class KafkaManager {

    public readonly producer: KafkaProducer;
    public readonly consumer: KafkaConsumer;
    public readonly taskEventHandler: TaskEventHandler;
    public readonly emailEventHandler: EmailEventHandler

    constructor(
        userRepository: IUserRepository,
        createNotificationUseCase: ICreateNotificationUseCase,
        organizationEmailService: IOrganizationEmailService,
    ) {
        this.producer = new KafkaProducer();
        this.consumer = new KafkaConsumer("resolvehub-consumer");
        this.taskEventHandler = new TaskEventHandler(
            userRepository, createNotificationUseCase
        );
        this.emailEventHandler = new EmailEventHandler(
            organizationEmailService
        )
    };

    async connect(): Promise<void> {
        await this.producer.connect();
        await this.consumer.connect();

        await this.consumer.subscribe(KafkaTopics.TASK_EVENTS);
        await this.consumer.subscribe(KafkaTopics.EMAIL_EVENTS);

        await this.consumer.consume({
            [KafkaTopics.TASK_EVENTS]: this.taskEventHandler.handle.bind(this.taskEventHandler),
            [KafkaTopics.EMAIL_EVENTS]: this.emailEventHandler.handle.bind(this.emailEventHandler),
        })

    }

    async disconnect(): Promise<void> {
        await this.consumer.disconnect();
        await this.producer.disconnect();
    }

}