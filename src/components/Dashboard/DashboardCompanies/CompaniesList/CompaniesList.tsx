import React from 'react'
// Components
import CompanyCard from '@/components/Cards/CompanyCard/CompanyCard';
// Custom Hooks
import { useFetchData } from '@/hooks/useFetchData';
// Types
import  Company from '@/types/company';

export default function CompaniesList() {
    const { data: companies, error, loading } = useFetchData<Company[]>('/api/companies');

    if (loading) {
      return <h1>Loading companies...</h1>;
    }
  
    if (error) {
      return <h1>Error fetching companies data... please try again</h1>;
    }
  
    return (
      <div>
        {companies && companies.length > 0 ? (
          companies.map(company => (
            <CompanyCard key={company._id} company={company} />
          ))
        ) : (
          <h4>No companies yet... add a company!</h4>
        )}
      </div>
    );
  };