'use client' 
import { useState } from 'react';
import styles from './MessageTemplateCard.module.css'
// Internal Components
import CopyTextButton from '@/components/Buttons/CopyTextButton/CopyTextButton';
// Utils
import { formatDate } from '@/utils/dateHelpers';
// Types
import MessageTemplate from '@/types/messageTemplate'
// External Libraries
import {  IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function MessageTemplateCard({title, message, target_audience, created_at, updated_at}: MessageTemplate) {
    // expanded state
    const [isExpanded, setIsExpanded] = useState(false); 

    const iconSize = 20;
    let trimLimit = 150
    let trimmedMessage = message.length > trimLimit ? `${message.slice(0, trimLimit)}...` : message;

    const formattedDateCreatedAt = formatDate(created_at.toString())
    const formattedDateUpdatedAt = updated_at ? formatDate(updated_at.toString()) : ''

  return (
    <article className={styles.card_recent}>
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
