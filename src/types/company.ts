export default interface Company {
    _id: string;
    name: string;
    industry?: string;
    mainContact?: string,
    email?: string;
    phone?: string;
    locationDetails?: {
        address?: string,
        locationCity?: string
    };
    notes?: string;
    links?: {
        website?: string,
        linkedIn?: string,
        github?: string,
        instagram?: string,
        facebook?: string,
    };
    lastContactedDate?: Date | string;
    createdAt: Date | string;
    updatedAt?: Date | string;
}