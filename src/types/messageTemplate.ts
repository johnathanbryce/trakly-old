export default interface MessageTemplate {
    template_id: string;
    title: string,
    message: string,
    target_audience?: string,
    created_at: Date | string;
    updated_at?: Date | string;
}