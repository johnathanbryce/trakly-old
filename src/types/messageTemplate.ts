export default interface MessageTemplate {
    _id: string;
    title: string,
    message: string,
    targetAudience?: string,
    createdAt: Date | string;
    updatedAt?: Date | string;
}