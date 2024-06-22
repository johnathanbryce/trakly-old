import React from 'react'
// Interal Components
import CompanyCardRecentlyAdded from '@/components/Cards/DashboardCards/DashboardHomeCards/CompanyCardRecentlyAdded/CompanyCardRecentlyAdded';
import Carousel from '@/components/Carousels/Carousel/Carousel';

// DUMMY DATA
const DUMMY_COMPANIES = [
    {
        _id: Math.random(),
        name: 'Thinkific',
        mainContact: 'Jeff Brown',
        phone: '220 742 5671',
        industry: 'Tech Solutions',
        email: 'thinkific@gmail.com',
        locationDetails: {
            address: '341 Water St.',
            locationCity: 'Vancouver',
        },
        createdAt: 'June 14, 2024',
        links: {
            linkedIn: 'https://www.linkedin.com/in/johnathanbryce/',
            website: 'https://www.thinkific.com/',
            instagram: 'https://www.instagram.com/thinkific/'
        },
    },
    {
        _id: Math.random(),
        name: 'XYZ Solutions',
        mainContact: 'Dan Murphy',
        phone: '413 722 5171',
        locationDetails: {
            address: '2412 West 17th Ave',
        },
        createdAt: 'June 9, 2024',
        links: {
            github: 'https://github.com/johnathanbryce',
            facebook: 'https://www.facebook.com/',
            instagram: 'https://www.instagram.com/thinkific/',
            website: 'https://www.google.ca/'
        },
    },
    {
        _id: Math.random(),
        name: 'A2B Processing',
        mainContact: 'Sarah Dean',
        industry: 'Consulting Services',
        phone: '541 712 5643',
        email: 'sarah@processing.com',
        locationDetails: {
            address: '19 East Blvd North',
            locationCity: 'Toronto',
        },
        createdAt: 'April 10, 2024',
        links: {
            linkedIn: 'https://www.linkedin.com/in/johnathanbryce/',
            website: 'https://www.thinkific.com/',
            instagram: 'https://www.instagram.com/thinkific/'
        },
    },
    
];

export default function DashboardHomeRecentCompanies() {
    //TODO: fetch data here for recent contacts 

    if(DUMMY_COMPANIES.length === 0){
        return(
            <div>
                <p> Hmm, looks like you haven&apos;t added any companies yet...</p>
                <p> Click here to add a contact</p>
            </div>
        )
    }
 
  return (
        <Carousel>
            {DUMMY_COMPANIES.map((company) =>
                <CompanyCardRecentlyAdded
                    _id={company._id.toString()}
                    key={company._id} 
                    name={company.name}
                    mainContact={company.mainContact}
                    locationDetails={company.locationDetails}
                    industry={company.industry}
                    email={company.email}
                    phone={company.phone}
                    links={company.links}
                    createdAt={company.createdAt}
                />
            )}
        </Carousel>
  )
}
