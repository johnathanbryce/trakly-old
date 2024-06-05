'use client' 
import { useState } from 'react';
import styles from './MessageTemplateCard.module.css'
// Internal Components
import CopyTextButton from '@/components/Buttons/CopyTextButton/CopyTextButton';
// Types
import MessageTemplate from '@/types/messageTemplate'
// External Libraries
import {  IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function MessageTemplateCard({title, message, targetAudience, createdAt, updatedAt}: MessageTemplate) {
    const [isExpanded, setIsExpanded] = useState(false); 

    const iconSize = 20;
    let trimLimit = 150
    let trimmedMessage = message.length > trimLimit ? `${message.slice(0, trimLimit)}...` : message;

    const handleToggleMessage = () => {
        setIsExpanded(!isExpanded)
    }


    
  return (
    <article className={styles.card_recent}>
        <p className={styles.name}>{title}</p>
        <p>{targetAudience}</p>
        <div className={styles.message_container}>
                <p>{ isExpanded ? message : trimmedMessage}</p>
                <div className={styles.trim_and_copy_container}> 
                    {message.length > trimLimit && (
                        <div className={styles.trim_message_toggle_container} onClick={handleToggleMessage}>
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
         <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{createdAt.toString()}</p>
         {updatedAt && <p className={styles.date_added}><span className={styles.added_text}>Updated: </span>{updatedAt.toString()}</p>}  
        </div>
    </article>
  )
}
