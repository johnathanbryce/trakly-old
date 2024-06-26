'use client'
import  {useState, useEffect} from 'react';
// Interal Components
import DashboardContainerCard from '@/components/Cards/DashboardCards/DashboardContainerCard/DashboardContainerCard'
import CompanyCard from '@/components/Cards/DashboardCards/CompanyCard/CompanyCard';
import LoaderSpinner from '@/components/Loaders/LoaderSpinner/LoaderSpinner';
import NoResultsFound from '@/components/NoResultsFound/NoResultsFound';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Recoil State
import { companiesState } from '@/recoil/dataFetchAtoms';
import { useRecoilValue } from 'recoil';
// Typesa
import Company from '@/types/company';
import DashboardContainerCardFullHeight from '@/components/Cards/DashboardCards/DashboardContainerCardFullHeight/DashboardContainerCardFullHeight';


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
          <DashboardContainerCardFullHeight title='Contacts'>
            <p>Error fetching companies data... please try again </p>
          </DashboardContainerCardFullHeight>
        )
    }
    
    if (!recoilCompanies.data || recoilCompanies.data.length === 0) {
        return (
          <DashboardContainerCardFullHeight title='Contacts'>
            <p>Hmm, looks like you haven&apos;t added any companies yet...</p>
            <p>Click here to add a contact</p>
          </DashboardContainerCardFullHeight>
        );
      }

  return (
    <DashboardContainerCard 
        title='Companies' 
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
            {filteredCompanies.length === 0 && <NoResultsFound searchParams='company name' /> }
    </DashboardContainerCard>
  )
}
