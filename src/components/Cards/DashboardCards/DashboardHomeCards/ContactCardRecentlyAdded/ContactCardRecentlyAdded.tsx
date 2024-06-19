'use client'
import styles from './ContactCardRecentlyAdded.module.css'
// Next
import Link from 'next/link';
// Types
import Contact from '@/types/contact'
// Utils
import { formatDate } from '@/utils/dateHelpers';
// External Libraries
import { IconMail, IconBrandLinkedin, IconPhone, IconTrash, IconWorldWww, IconBrandGithub, IconBrandMeta  } from '@tabler/icons-react';


export default function ContactCardRecentlyAdded({
    contact_id, first_name, last_name, email, phone, company, position, created_at, github, instagram, website, linkedin
}: Contact) {

    const contactBracket = email && phone ? '|' : '';
    const companyAnyPositioBracket = position && company ? '-' : ''
    const iconSize = 20;

    const formattedDate = formatDate(created_at.toString())

    // TODO create this fn (will likely be reusable elsewhere)
    const handleDeleteItem = () => {

    }

  return (
    <article className={styles.card_recent}>
        <IconTrash className={styles.icon_delete} size={iconSize} onClick={handleDeleteItem}/>
        <div className={styles.card_top_flex_container}>
          <p className={styles.name}>{`${first_name} ${last_name ? last_name : ''}`}</p>

          <div>
            <p className={styles.position_and_company_text}> {position} {companyAnyPositioBracket} {company}</p>
          </div>
          
          <p className={styles.contact}> 
              {email} {contactBracket} {phone}
          </p>
        </div>

        <div className={styles.card_footer}>
          <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{formattedDate}</p>
          <div className={styles.icons_container}>
              {linkedin && <Link href={linkedin} target="_blank"><IconBrandLinkedin className={styles.icon_contact} size={iconSize}/></Link>}
              {website && <Link href={website} target="_blank"><IconWorldWww className={styles.icon_contact} size={iconSize}/></Link>}
              {github && <Link href={github} target="_blank"><IconBrandGithub className={styles.icon_contact} size={iconSize}/></Link>}
              {instagram && <Link href={instagram} target="_blank"><IconBrandMeta className={styles.icon_contact} size={iconSize}/></Link>}
              {phone && <a href={`tel:${phone}`}><IconPhone className={styles.icon_contact} size={iconSize}/></a>}
              {email && <a href={`mailtol:${email}`} target="_blank"><IconMail className={styles.icon_contact} size={iconSize}/></a>}
          </div>
        </div>
    </article>
  )
}
