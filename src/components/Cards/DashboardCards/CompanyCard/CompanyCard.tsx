'use client'
import styles from './CompanyCard.module.css'
import { useState } from 'react';
// Next
import Link from 'next/link';
// Internal Components
import DeleteConfirmation from '@/components/DeleteConfirmation/DeleteConfirmation';
// Utils
import { formatDate } from '@/utils/dateHelpers';
import { deleteItemFromDatabase } from '@/utils/deleteHelpers';
// Types
import Company from '@/types/company';
// Recoil State
import { useRecoilState } from 'recoil';
import { companiesState } from '@/recoil/dataFetchAtoms';
// Clerk Auth
import { useAuth } from '@clerk/clerk-react';
// External Libraries
import { IconMail, IconBrandLinkedin, IconPhone, IconTrash, IconBrandFacebook, IconWorldWww, IconBrandGithub, IconBrandInstagram, IconChevronUp, IconChevronDown } from '@tabler/icons-react';


export default function CompanyCard({
    company_id, name, email, phone, website, linkedin, github, instagram, facebook, industry, location_city, address, notes, created_at, main_contact
}: Company) {
    // toggle statuses
    const [toggleDeleteItem, setToggleDeleteItem] = useState(false);
    const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
    // recoil global state to filter out the deleted contact
    const [companies, setCompanies] = useRecoilState(companiesState);

    // clerk auth for userId and token for deleteItems headers
    const { userId, getToken } = useAuth();  

    const bracket = address && location_city ? '|' : '';
    const iconSize = 20;
    const readMoreTrimLength = 55;

    const formattedDate = formatDate(created_at.toString())

    const handleDeleteCompany = async () => {
      const token = await getToken();
      if (!userId || !token) {
        console.error('User ID and/or token is not defined');
        return;
      }

      try {
        await deleteItemFromDatabase(`http://localhost:8000/api/companies/${company_id}`, userId, token);
        // update Recoil state by removing the deleted contact
        setCompanies(prevState => ({
          ...prevState,
          data: (prevState.data ?? []).filter(contact => contact.company_id !== company_id) // checks if prevState.data is null or undefined, if so provide an empty array 
        }));
        
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }

  return (
    <article className={styles.card_recent}>
        <IconTrash className={styles.icon_delete} size={iconSize} onClick={() => setToggleDeleteItem(true)}/>
        {toggleDeleteItem && <DeleteConfirmation itemToDelete={name} onClickDeleteItem={handleDeleteCompany} onClickCloseConfirmation={() => setToggleDeleteItem(false)}/>}
        <div className={styles.card_top_flex_container}>
            <p className={styles.name}>{name}</p>
            <p className={styles.location_details}> {address} {bracket} {location_city}</p>
            {/* TODO: work on logic to route to contact created in Trakly */}
            <p className={styles.contact}><Link href={`/companies/${company_id}`}>Contact: {main_contact}</Link></p>
            <p className={styles.industry}>{industry ?? <br/>}</p>
        </div>

        <div className={styles.card_footer}>
          <div className={styles.card_footer_flex_row_container}>
            <div className={styles.icons_container}>
            {linkedin && <Link href={linkedin} target="_blank"><IconBrandLinkedin className={styles.icon_contact} size={iconSize}/></Link>}
                {website &&  <Link href={website} target="_blank"><IconWorldWww className={styles.icon_contact} size={iconSize}/></Link>}
                {github &&   <Link href={github} target="_blank"><IconBrandGithub className={styles.icon_contact} size={iconSize}/></Link>}
                {instagram && <Link href={instagram} target="_blank"><IconBrandInstagram className={styles.icon_contact} size={iconSize}/></Link>}
                {facebook && <Link href={facebook} target="_blank"><IconBrandFacebook className={styles.icon_contact} size={iconSize}/></Link>}
                {phone && <a href={`tel:${phone}`}><IconPhone className={styles.icon_contact} size={iconSize}/></a>}
                {email && <a href={`mailtol:${email}`} target="_blank"><IconMail className={styles.icon_contact} size={iconSize}/></a>}
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
                  <button className={styles.read_more_btn} onClick={() => setIsReadMoreExpanded(!isReadMoreExpanded)}>
                      {isReadMoreExpanded ? <IconChevronUp className={styles.icon_contact} /> : <IconChevronDown className={styles.icon_contact}/>}
                  </button>
              )}
          </div>
        </div>
    </article>
  )
}
