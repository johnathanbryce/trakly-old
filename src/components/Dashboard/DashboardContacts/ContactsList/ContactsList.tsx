
'use client'
// Components
import ContactCard from '@/components/Cards/ContactCard/ContactCard'
// Recoil Global State
import { contactsState } from '@/recoil/dataFetchAtoms';
// API
import { useFetchData } from '@/hooks/useFetchData';
// Types
import Contact from '@/types/contact';

export default function ContactsList() {
    const { data: contacts, error, loading } = useFetchData<Contact[]>('/api/contacts', contactsState); //TODO: update the route when rdy

    if (loading) {
      return <h1>Loading contacts...</h1>;
    }
  
    if (error) {
      return <h1>Error fetching contacts data... please try again</h1>;
    }
  return (
    <div>
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard key={contact._id} contact={contact} />
        ))
      ) : (
        <h4>No contacts yet... add a contact!</h4>
      )}
    </div>
  )
}
