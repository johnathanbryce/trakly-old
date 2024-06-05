import React from 'react'
// Next
import Link from 'next/link';
// Interal Components
import ContactCardRecentlyAdded from '@/components/Cards/DashboardCards/DashboardHomeCards/ContactCardRecentlyAdded/ContactCardRecentlyAdded'

// DUMMY DATA
const DUMMY_CONTACTS = [
    {
        _id: Math.random(),
        firstName: 'John',
        lastName: 'Brown',
        email: 'johnbrown@gmail.com',
        company: 'Blue Wave Dev',
        position: 'Frontend Developer',
        createdAt: 'Apr 8, 2024',
        links: {
            linkedIn: 'https://www.linkedin.com/in/johnathanbryce/',
            website: 'https://www.jbryce.dev/'
        }
    },
    {
        _id: Math.random(),
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        phone: '6041234567',
        company: 'Tech Solutions',
        createdAt: 'May 12, 2024',
        links: {
            website: 'https://www.jbryce.dev/'
        }
        
    },
    {
        _id: Math.random(),
        firstName: 'Emily',
        lastName: 'Smith',
        phone: '7789876543',
        company: 'InnovateX',
        position: 'Product Manager',
        createdAt: 'May 17, 2024',
    },
];

export default function DashboardHomeRecentContacts() {
    //TODO: fetch data here for recent contacts 

    if(DUMMY_CONTACTS.length === 0){
        return(
            <div>
                <p> Hmm, looks like you haven&apos;t added any contacts yet...</p>
                <p> Click here to add a contact</p>
            </div>
        )
    }

  return (
        <>
            {DUMMY_CONTACTS.map((contact) =>
                <ContactCardRecentlyAdded
                    _id={contact._id.toString()}
                    key={contact._id} 
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    position={contact.position}
                    company={contact.company}
                    email={contact.email}
                    phone={contact.phone}
                    links={contact.links}
                    createdAt={contact.createdAt}
                />
            )}
        </>
  )
}
