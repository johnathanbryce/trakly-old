import styles from './DeleteConfirmation.module.css'
import Button from '../Buttons/Button/Button'

interface DeleteConfirmationProps {
    itemToDelete: any
    onClickDeleteItem: () => void,
    onClickCloseConfirmation: () => void,
} 

export default function DeleteConfirmation({itemToDelete, onClickDeleteItem, onClickCloseConfirmation}: DeleteConfirmationProps) {

  return (
    <div className={styles.delete_confirmation}>
        <p className={styles.warning_header}>Are you sure you want to delete {itemToDelete}?</p>
        <p className={styles.warning_subheader}>(this action is permant)</p>
        <div className={styles.buttons_container}>
            <Button
                label='Yes' 
                isLoading={false}
                onClick={onClickDeleteItem} 
            />
            <Button
                label='No' 
                isLoading={false}
                onClick={onClickCloseConfirmation} 
            />
        </div>
    </div>
  )
}
