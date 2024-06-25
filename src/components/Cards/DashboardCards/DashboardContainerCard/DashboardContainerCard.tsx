import styles from './DashboardContainerCard.module.css'
import Link from 'next/link'
// Internal Components
import SearchBar from '@/components/SearchBar/SearchBar'

interface DashboardCardProps {
    children: any,
    title: string,
    subTitle?: string,
    subTitleLink?: string,
    isGridContainer?: boolean,
    isSearchBar?: boolean,
    searchValues?: any[],
    onSearchResults?: (results: any[]) => void,
    placeholder?: string,
}

// reusable UI cards for dashboard content
export default function DashboardContainerCard({
    children, title, subTitle, subTitleLink, isGridContainer, isSearchBar, searchValues, onSearchResults, placeholder
}: DashboardCardProps) {

  return (
    <section className={styles.dashboard_container_card}>
      <div className={styles.header_container}>
        <h3>{title}</h3>
        { !subTitleLink && <p>{subTitle}</p> }
        { subTitleLink && <p><Link href={subTitleLink}>{subTitle}</Link></p> }
        {isSearchBar && searchValues && onSearchResults && (
          <SearchBar 
            input={""} 
            searchValues={searchValues} 
            onSearchResults={onSearchResults}
            placeholder={placeholder || ''} 
          />
        )}
      </div>
      {isGridContainer ? (
        <div className={styles.children_grid_container}>
          {children}
        </div>
      ) : (
        <>
          {children}
        </>
      )}
    </section>
  )
}
