'use client'
import styles from './SearchBar.module.css'
import { useState } from "react";
// Internal Components
import Input from "../Inputs/Input/Input";

interface SearchBarProps {
    input: string;
    searchValues: any[]; 
    onSearchResults: (results: any[]) => void;
    placeholder: string;
}

export default function SearchBar({ input, searchValues, onSearchResults, placeholder }: SearchBarProps) {
    const [query, setQuery] = useState(input);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        // perform search only if there's input
        if (value.trim() === '') {
            onSearchResults(searchValues);
            return;
        }

        if(placeholder === 'Search contacts...'){
            const results = searchValues.filter(item => {
                const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
                return fullName.includes(value);
            });
            // update recoil state which in turn filters on Contacts/Companies/Templates pages
            onSearchResults(results);
        }

        if(placeholder === 'Search companies...'){
            const results = searchValues.filter(item => {
                const companyName = item.name.toLowerCase();
                return companyName.includes(value);
            });
            // update recoil state which in turn filters on Contacts/Companies/Templates pages
            onSearchResults(results);
        }
    };

    return (
        <div>
            <Input 
                type="text"
                name='Search'
                placeholder={placeholder}
                value={query}
                onChange={handleSearch}
            />  
        </div>
   
    );
}
