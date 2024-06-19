'use client'
// Interal Components
import ContactCardRecentlyAdded from '@/components/Cards/DashboardCards/DashboardHomeCards/ContactCardRecentlyAdded/ContactCardRecentlyAdded'
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { contactsState } from '@/recoil/dataFetchAtoms';
// Types
import Contact from '@/types/contact';

export default function DashboardHomeRecentContacts() {
    const { data: contacts, error, loading } = useFetchData<Contact[]>(`http://localhost:8000/api/contacts?limit=5`, contactsState); 

    if (loading) {
        return <p>Loading contacts...</p>;
    }
    
    if (error) {
        return <h1>Error fetching contacts data... please try again</h1>;
    }
    
    if (!contacts || contacts.length === 0) {
        return (
            <div>
                <p> Hmm, looks like you haven&apos;t added any contacts yet...</p>
                <p> Click here to add a contact</p>
            </div>
        );
    }

  return (
        <>
            {contacts.map((contact) =>
                <ContactCardRecentlyAdded
                    contact_id={contact.contact_id}
                    key={contact.contact_id} 
                    first_name={contact.first_name}
                    last_name={contact.last_name}
                    position={contact.position}
                    company={contact.company}
                    email={contact.email}
                    phone={contact.phone}
                    github={contact.github}
                    instagram={contact.instagram}
                    website={contact.website}
                    linkedin={contact.linkedin}
                    created_at={contact.created_at}
                />
            )}
        </>
  )
}
