'use client' 
import { useState } from 'react';
import styles from './MessageTemplateCard.module.css'
// Internal Components
import CopyTextButton from '@/components/Buttons/CopyTextButton/CopyTextButton';
import DeleteConfirmation from '@/components/DeleteConfirmation/DeleteConfirmation';
// Utils
import { formatDate } from '@/utils/dateHelpers';
import { deleteItemFromDatabase } from '@/utils/deleteHelpers';
// Recoil State
import { useRecoilState } from 'recoil';
import { templatesState } from '@/recoil/dataFetchAtoms';
// Clerk Auth
import { useAuth } from '@clerk/clerk-react';
// Types
import MessageTemplate from '@/types/messageTemplate'
// External Libraries
import {  IconChevronDown, IconChevronUp, IconTrash } from '@tabler/icons-react';

export default function MessageTemplateCard({template_id, title, message, target_audience, created_at, updated_at}: MessageTemplate) {
    // toggle statuses
    const [toggleDeleteItem, setToggleDeleteItem] = useState(false);
    // expanded state
    const [isExpanded, setIsExpanded] = useState(false); 
    // recoil global state to filter out the deleted contact
    const [contacts, setTemplates] = useRecoilState(templatesState);
    // clerk auth for userId and token for deleteItems headers
    const { userId, getToken } = useAuth();  

    const iconSize = 20;
    let trimLimit = 150
    let trimmedMessage = message.length > trimLimit ? `${message.slice(0, trimLimit)}...` : message;

    const formattedDateCreatedAt = formatDate(created_at.toString())
    const formattedDateUpdatedAt = updated_at ? formatDate(updated_at.toString()) : '';

    const handleDeleteContact = async () => {
        const token = await getToken();
        if (!userId || !token) {
          console.error('User ID and/or token is not defined');
          return;
        }
  
        try {
          await deleteItemFromDatabase(`http://localhost:8000/api/messages/${template_id}`, userId, token);
          // update Recoil state by removing the deleted contact
          setTemplates(prevState => ({
            ...prevState,
            data: (prevState.data ?? []).filter(template => template.template_id !== template_id) // checks if prevState.data is null or undefined, if so provide an empty array 
          }));
          
        } catch (error) {
          console.error('Failed to delete contact:', error);
        }
      }

  return (
    <article className={styles.card_message_templates}>
        <IconTrash className={styles.icon_delete} onClick={() =>setToggleDeleteItem(true)}/>
        {toggleDeleteItem && <DeleteConfirmation itemToDelete={title} onClickDeleteItem={handleDeleteContact} onClickCloseConfirmation={() => setToggleDeleteItem(false)}/>}
        <p className={styles.name}>{title}</p>
        <p>{target_audience}</p>
        <div className={styles.message_container}>
                <p>{ isExpanded ? message : trimmedMessage}</p>
                <div className={styles.trim_and_copy_container}> 
                    {message.length > trimLimit && (
                        <div className={styles.trim_message_toggle_container} onClick={() => setIsExpanded(!isExpanded)}>
                            {isExpanded ? (
                                <>
                                    <p className={styles.toggle}>Read less... </p>
                                    <IconChevronUp className={styles.toggle} size={iconSize} />
                                </>
                            ) : (
                                <>
                                    <p className={styles.toggle}>Read more... </p>
                                    <IconChevronDown className={styles.toggle} size={iconSize} />
                                </>
                            )}
                        </div>
                    )}
                    <div /> {/*allows copy btn to flex to end of container when no read less/more toggle*/}
                    <CopyTextButton textToCopy={message}/>
                </div>
        </div>
        
        <div className={styles.card_footer}>
         <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{formattedDateCreatedAt}</p>
         {updated_at && <p className={styles.date_added}><span className={styles.added_text}>Updated: </span>{formattedDateUpdatedAt}</p>}  
        </div>
    </article>
  )
}
