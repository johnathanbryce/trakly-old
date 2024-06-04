import styles from './ContactCardRecentlyAdded.module.css'
// Types
import Contact from '@/types/contact'
// External Libraries
import { IconMail, IconBrandLinkedin } from '@tabler/icons-react';


export default function ContactCardRecentlyAdded({
    firstName, lastName, email, phone, company, position, createdAt, linkedIn
}: Contact) {

    const contactBracket = email && phone ? '|' : '';

  return (
    <article className={styles.contact_card_recent}>
        <p className={styles.name}>{`${firstName} ${lastName ? lastName : ''}`}</p>
        <p className={styles.company}>{company}</p>
        <p className={styles.position}>{position}</p>
        
        <p className={styles.contact}> 
            {email} {contactBracket} {phone}
        </p>
        <div className={styles.card_footer}>
         <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{createdAt.toString()}</p>
         <div className={styles.icons_container}>
            {email && <IconMail className={styles.icon_contact}/>}
            {linkedIn && <IconBrandLinkedin className={styles.icon_contact}/>}
         </div>
        </div>
    </article>
  )
}
