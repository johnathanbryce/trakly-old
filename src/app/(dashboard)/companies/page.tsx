'use client'
import  {useState, useEffect} from 'react';
import styles from './contacts.module.css'
// Interal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard'
import CompanyCard from '@/components/Cards/DashboardCards/CompanyCard/CompanyCard';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { companiesState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Typesa
import Company from '@/types/company';

export default function Companies() {
    const { data: contacts, error, loading } = useFetchData<Company[]>(`http://localhost:8000/api/companies`, companiesState); 
    // recoil global state (to update on deletion of contacts)
    const recoilCompanies = useRecoilValue(companiesState);

    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(recoilCompanies.data ?? []);

    // ensures filtered contacts is kept in sync with recoilCompanies when recoilCompanies changes
    useEffect(() => {
        setFilteredCompanies(recoilCompanies.data ?? []);
    }, [recoilCompanies]);

    const handleSearchResults = (results: Company[]) => {
        setFilteredCompanies(results);
    };

    if (loading) {
        return <LoaderSpinner />;
    }
    
    if (error) {
        return (
          <DashboardContainerCard title='Contacts'>
            <h4>Error fetching companies data... please try again </h4>
          </DashboardContainerCard>
        )
    }
    
    if (!recoilCompanies.data || recoilCompanies.data.length === 0) {
        return (
          <DashboardContainerCard title='Contacts'>
            <p>Hmm, looks like you haven&apos;t added any companies yet...</p>
            <p>Click here to add a contact</p>
          </DashboardContainerCard>
        );
      }

  return (
    <DashboardContainerCard 
        title='Contacts' 
        isGridContainer={true} 
        isSearchBar={true} 
        searchValues={recoilCompanies.data} 
        onSearchResults={handleSearchResults}
        placeholder='Search companies...'
    >
            {filteredCompanies.map((company: Company) =>
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
    </DashboardContainerCard>
  )
}
