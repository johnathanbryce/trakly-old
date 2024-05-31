export default interface Contact {
    _id: string;
    firstName: string;
    lastName?: string,
    email: string;
    phone?: string;
    company?: string;
    position?: string;
    notes?: string;
    lastContactedDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}