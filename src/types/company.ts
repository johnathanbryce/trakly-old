export default interface Company {
    _id: string;
    name: string;
    mainContact?: string,
    email: string;
    phone?: string;
    address?: string
    notes?: string;
    lastContactedDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}