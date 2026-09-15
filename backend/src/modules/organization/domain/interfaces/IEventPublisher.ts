export interface IEventPublisher {
    publish(topic: string, message: unknown,): Promise<void>;
}