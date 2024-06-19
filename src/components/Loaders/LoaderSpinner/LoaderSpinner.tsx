import styles from './LoaderSpinner.module.css'

function LoaderSpinner() {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader} />
    </div>
  )
}

export default LoaderSpinner  