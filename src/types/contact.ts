export default interface Contact {
    contact_id: string;
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
    notes?: string;
    contact_method?: string;
    last_contacted_date?: Date | string;
    created_at: Date | string;
    updated_at?: Date | string;
}