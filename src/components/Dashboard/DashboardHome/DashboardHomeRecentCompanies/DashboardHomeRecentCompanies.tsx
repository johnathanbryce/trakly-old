'use client'
import React from 'react'
// Interal Components
import CompanyCard from '@/components/Cards/DashboardCards/CompanyCard/CompanyCard';
import Carousel from '@/components/Carousels/Carousel/Carousel';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { companiesState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Types
import Company from '@/types/company';

export default function DashboardHomeRecentCompanies() {
    const limit = 5;
    const { data: companies, error, loading } = useFetchData<Company[]>(`http://localhost:8000/api/companies?limit=${limit}`, companiesState); 
    // recoil global state (to update on deletion of companies)
    const recoilCompanies = useRecoilValue(companiesState);

    if (loading) {
        return <LoaderSpinner />;
    }
    
    if (error) {
        return <h6>Error fetching companies data... please try again</h6>;
    }
    
    if (!recoilCompanies.data || recoilCompanies.data.length === 0) {
        return (
          <div>
            <p>Looks like you haven&apos;t added any companies yet...</p>
            <p>Click here to add a company.</p>
          </div>
        );
    }
 
  return (
        <Carousel>
            {recoilCompanies.data && recoilCompanies.data.map((company: Company) =>
                <CompanyCard
                    company_id={company.company_id}
                    key={company.company_id} 
                    name={company.name}
                    main_contact={company.main_contact}
                    location_city={company.location_city}
                    industry={company.industry}
                    email={company.email}
                    phone={company.phone}
                    website={company.website}
                    linkedin={company.linkedin}
                    instagram={company.instagram}
                    facebook={company.facebook}
                    created_at={company.created_at}
                    notes={company.notes}
                />
            )}
        </Carousel>
  )
}
