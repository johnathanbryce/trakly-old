'use client'
// Interal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard'
import ContactCard from '@/components/Cards/DashboardCards/ContactCard/ContactCard';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { contactsState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Types
import Contact from '@/types/contact';
import { useState, useEffect } from 'react';

export default function Contacts() {
    const { data: contacts, error, loading } = useFetchData<Contact[]>(`http://localhost:8000/api/contacts`, contactsState); 
    // recoil global state (to update on deletion of contacts)
    const recoilContacts = useRecoilValue(contactsState);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>(recoilContacts.data ?? []);

    // ensures filtered contacts is kept in sync with recoilContacts when recoilContacts changes
    useEffect(() => {
        setFilteredContacts(recoilContacts.data ?? []);
    }, [recoilContacts]);

    const handleSearchResults = (results: Contact[]) => {
        setFilteredContacts(results);
    };

    if (loading) {
        return <LoaderSpinner />;
    }
    
    if (error) {
        return (
          <DashboardContainerCard title='Contacts'>
            <h4>Error fetching contacts data... please try again </h4>
          </DashboardContainerCard>
        )
    }
    
    if (!recoilContacts.data || recoilContacts.data.length === 0) {
        return (
          <DashboardContainerCard title='Contacts'>
            <p>Hmm, looks like you haven&apos;t added any contacts yet...</p>
            <p>Click here to add a contact</p>
          </DashboardContainerCard>
        );
    }

    return (
        <DashboardContainerCard 
            title='Contacts' 
            isGridContainer={true} 
            isSearchBar={true} 
            searchValues={recoilContacts.data} 
            onSearchResults={handleSearchResults}
            placeholder='Search contacts...'
        >
            {filteredContacts.map((contact: Contact) => (
                <ContactCard
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
                    notes={contact.notes}
                />
            ))}
        </DashboardContainerCard>
    )
}

