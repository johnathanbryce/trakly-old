'use client'
import styles from './ContactCard.module.css'
import { useState } from 'react';
// Next
import Link from 'next/link';
// Internal Components
import DeleteConfirmation from '@/components/DeleteConfirmation/DeleteConfirmation';
// Types
import Contact from '@/types/contact'
// Utils
import { formatDate } from '@/utils/dateHelpers';
import { deleteItemFromDatabase } from '@/utils/deleteHelpers';
// Recoil State
import { useRecoilState } from 'recoil';
import { contactsState } from '@/recoil/dataFetchAtoms';
// Clerk Auth
import { useAuth } from '@clerk/clerk-react';
// External Libraries
import { IconMail, IconBrandLinkedin, IconPhone, IconTrash, IconWorldWww, IconBrandGithub, IconBrandMeta, IconChevronUp, IconChevronDown  } from '@tabler/icons-react';

export default function ContactCard({
    contact_id, first_name, last_name, email, phone, company, position, created_at, github, instagram, website, linkedin, notes
}: Contact) {
    // toggle statuses
    const [toggleDeleteItem, setToggleDeleteItem] = useState(false);
    const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
    // recoil global state to filter out the deleted contact
    const [contacts, setContacts] = useRecoilState(contactsState);
    // clerk auth for userId and token for deleteItems headers
    const { userId, getToken } = useAuth();  

    const contactBracket = email && phone ? '|' : '';
    const companyPositionBracket = position && company ? '-' : ''
    const readMoreTrimLength = 72;

    const formattedDate = formatDate(created_at.toString())

    const handleDeleteContact = async () => {
      const token = await getToken();
      if (!userId || !token) {
        console.error('User ID and/or token is not defined');
        return;
      }

      try {
        await deleteItemFromDatabase(`http://localhost:8000/api/contacts/${contact_id}`, userId, token);
        // update Recoil state by removing the deleted contact
        setContacts(prevState => ({
          ...prevState,
          data: (prevState.data ?? []).filter(contact => contact.contact_id !== contact_id) // checks if prevState.data is null or undefined, if so provide an empty array 
        }));
        
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }

    // handlers to avoid fn re-creation each render (previously had it inline as {() => toggleReadMore} which recreates it each time)
    const toggleDeleteConfirmation = () => setToggleDeleteItem(!toggleDeleteItem);
    const toggleReadMore = () => setIsReadMoreExpanded(!isReadMoreExpanded);

  return (
    <article className={styles.contact_card}>
        <IconTrash className={styles.icon_delete} onClick={toggleDeleteConfirmation}/>
        {toggleDeleteItem && <DeleteConfirmation itemToDelete={`${first_name} ${last_name ? last_name : ''}`} onClickDeleteItem={handleDeleteContact} onClickCloseConfirmation={toggleDeleteConfirmation}/>}
        <div className={styles.card_top_flex_container}>
          <p className={styles.name}>{`${first_name} ${last_name ? last_name : ''}`}</p>
          <p className={styles.position_and_company_text}> {position} {companyPositionBracket} {company}</p>
          <p className={styles.contact}> 
              {email} {contactBracket} {phone}
          </p>
        </div>

        <div className={styles.card_footer}>
          <div className={styles.card_footer_flex_row_container}>
            <div className={styles.icons_container}>
                {linkedin && <Link href={linkedin} target="_blank"><IconBrandLinkedin className={styles.icon_contact}/></Link>}
                {website && <Link href={website} target="_blank"><IconWorldWww className={styles.icon_contact}/></Link>}
                {github && <Link href={github} target="_blank"><IconBrandGithub className={styles.icon_contact}/></Link>}
                {instagram && <Link href={instagram} target="_blank"><IconBrandMeta className={styles.icon_contact}/></Link>}
                {phone && <a href={`tel:${phone}`}><IconPhone className={styles.icon_contact}/></a>}
                {email && <a href={`mailto:${email}`} target="_blank"><IconMail className={styles.icon_contact}/></a>}
            </div>
            <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{formattedDate}</p>
          </div>
        
          <div className={styles.notes_container}>
            <p className={styles.notes}>
                {notes && notes.length > readMoreTrimLength 
                    ? isReadMoreExpanded 
                        ? notes 
                        : `${notes.substring(0, readMoreTrimLength)}...`
                    : notes
                }
            </p>
            {notes && notes.length > readMoreTrimLength && (
                <button className={styles.read_more_btn} onClick={toggleReadMore}>
                    {isReadMoreExpanded ? <IconChevronUp className={styles.icon_contact} /> : <IconChevronDown className={styles.icon_contact}/>}
                </button>
            )}
          </div>
         
        </div>
    </article>
  )
}
