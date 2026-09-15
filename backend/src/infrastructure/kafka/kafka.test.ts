import "dotenv/config";

import { KafkaProducer } from "./kafka.producer";
import { KafkaTopics } from "../../shared/constant/kafka.topics";

async function testProducer() {
    const producer = new KafkaProducer();

    try {
        await producer.connect();

        await producer.publish(
            KafkaTopics.TASK_EVENTS,
            {
                event: "TASK_ASSIGNED",
                taskId: "test-task-123",
                userId: "test-user-123",
                message: "Test task event",
            },
        );

        console.log("Kafka test event published successfully");
    } catch (error) {
        console.error("Kafka producer test failed:", error);
    } finally {
        await producer.disconnect();
    }
}

testProducer();