import React from 'react'
// Interal Components
import ContactCardRecentlyAdded from '@/components/Cards/DashboardCards/DashboardHome/ContactCardRecentlyAdded/ContactCardRecentlyAdded'

// DUMMY DATA
// DUMMY DATA
const DUMMY_CONTACTS = [
    {
        _id: Math.random(),
        firstName: 'John',
        lastName: 'Brown',
        email: 'johnbrown@gmail.com',
        /* phone: '6042207425', */
        company: 'Blue Wave Dev',
        position: 'Frontend Developer',
        createdAt: 'Apr 8, 2024',
        linkedIn: 'https://www.linkedin.com/in/johnathanbryce/'
    },
    {
        _id: Math.random(),
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        phone: '6041234567',
        company: 'Tech Solutions',
        position: 'Backend Developer',
        createdAt: 'May 12, 2024',
        
    },
    {
        _id: Math.random(),
        firstName: 'Emily',
        lastName: 'Smith',
     /*    email: 'emilysmith@gmail.com', */
        phone: '7789876543',
        company: 'InnovateX',
        position: 'Product Manager',
        createdAt: 'May 17, 2024',
        linkedIn: 'https://www.linkedin.com/in/johnathanbryce/'
    },
/*     {
        _id: Math.random(),
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michaeljohnson@gmail.com',
        phone: '6048765432',
        company: 'Creative Labs',
        position: 'UX Designer',
        createdAt: 'Feb 27, 2024',
    }, */
];



export default function DashboardHomeRecentContacts() {
    //TODO: fetch data here for recent contacts 
  return (
    <>
        {DUMMY_CONTACTS.map((contact) =>
            <ContactCardRecentlyAdded
                _id={contact._id.toString()}
                key={contact._id} 
                firstName={contact.firstName}
                lastName={contact.lastName}
                company={contact.company}
                email={contact.email}
                phone={contact.phone}
                linkedIn={contact.linkedIn}
                createdAt={contact.createdAt}
            />
        )}
    </>
  )
}
