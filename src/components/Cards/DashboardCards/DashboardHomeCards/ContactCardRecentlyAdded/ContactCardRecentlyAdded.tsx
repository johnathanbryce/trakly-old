'use client'
import styles from './ContactCardRecentlyAdded.module.css'
// Next
import Link from 'next/link';
// Types
import Contact from '@/types/contact'
// External Libraries
import { IconMail, IconBrandLinkedin, IconPhone, IconTrash, IconWorldWww  } from '@tabler/icons-react';


export default function ContactCardRecentlyAdded({
    firstName, lastName, email, phone, company, position, createdAt, links
}: Contact) {

    const contactBracket = email && phone ? '|' : '';
    const companyAnyPositioBracket = position && company ? '-' : ''
    const iconSize = 20;

    // TODO create this fn (will likely be reusable elsewhere)
    const handleDeleteItem = () => {

    }

  return (
    <article className={styles.card_recent}>
        <IconTrash className={styles.icon_delete} size={iconSize} onClick={handleDeleteItem}/>
        <p className={styles.name}>{`${firstName} ${lastName ? lastName : ''}`}</p>

        <div>
          <p> {position} {companyAnyPositioBracket} {company}</p>
        </div>
        
        <p className={styles.contact}> 
            {email} {contactBracket} {phone}
        </p>

        <div className={styles.card_footer}>
         <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{createdAt.toString()}</p>
         <div className={styles.icons_container}>
            {links?.linkedIn && <Link href={links?.linkedIn} target="_blank"><IconBrandLinkedin className={styles.icon_contact} size={iconSize}/></Link>}
            {links?.website && <Link href={links?.website} target="_blank"><IconWorldWww className={styles.icon_contact} size={iconSize}/></Link>}
            {phone && <a href={`tel:${phone}`}><IconPhone className={styles.icon_contact} size={iconSize}/></a>}
            {email && <a href={`mailtol:${email}`} target="_blank"><IconMail className={styles.icon_contact} size={iconSize}/></a>}
         </div>
        </div>
    </article>
  )
}
