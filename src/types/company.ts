export default interface Company {
    company_id: string;
    name: string;
    industry?: string;
    main_contact?: string,
    email?: string;
    phone?: string;
    address?: string;
    location_city?: string;
    notes?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    facebook?: string;
    last_contacted_date?: Date | string;
    created_at: Date | string;
    updated_at?: Date | string;
}