import styles from './NoResultsFound.module.css'

interface NoResultsFoundProps {
    searchParams: string,
}

export default function NoResultsFound({searchParams}: NoResultsFoundProps) {
  return (
    <div className={styles.no_results_container}>
        <p> No results found.</p>
        <p> Please refine your search by {searchParams}. </p>
    </div>
  )
}
