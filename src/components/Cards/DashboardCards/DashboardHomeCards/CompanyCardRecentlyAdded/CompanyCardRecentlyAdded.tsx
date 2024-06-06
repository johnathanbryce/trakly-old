'use client'
import styles from './CompanyCardRecentlyAdded.module.css'
// Next
import Link from 'next/link';
// Types
import Company from '@/types/company';
// External Libraries
import { IconMail, IconBrandLinkedin, IconPhone, IconTrash, IconBrandFacebook, IconWorldWww, IconBrandGithub, IconBrandInstagram } from '@tabler/icons-react';


export default function CompanyCardRecentlyAdded({
    _id, name, email, phone, links, industry, locationDetails, createdAt, mainContact
}: Company) {

    const bracket = locationDetails?.address && locationDetails?.locationCity ? '|' : '';
    const iconSize = 20;

    // TODO create this fn (will likely be reusable elsewhere)
    const handleDeleteItem = () => {

    }

  return (
    <article className={styles.card_recent}>
        <IconTrash className={styles.icon_delete} size={iconSize} onClick={handleDeleteItem}/>
        <div className={styles.card_top_flex_container}>
            <div className={styles.header_container}>
              <p className={styles.name}>{name}</p>
              <p className={styles.industry}>{industry ?? <br/>}</p>
            </div>
            
            <p className={styles.location_details}> {locationDetails?.address} {bracket} {locationDetails?.locationCity}</p>
            {/* TODO: work on logic to route to contact created in Trakly */}
            <p className={styles.contact}><Link href={`/contacts/${_id}`}>Contact: {mainContact}</Link></p>
        </div>

        <div className={styles.card_footer}>
            <p className={styles.date_added}><span className={styles.added_text}>Added: </span>{createdAt.toString()}</p>
            <div className={styles.icons_container}>
                {links?.linkedIn && <Link href={links.linkedIn} target="_blank"><IconBrandLinkedin className={styles.icon_contact} size={iconSize}/></Link>}
                {links?.website &&  <Link href={links.website} target="_blank"><IconWorldWww className={styles.icon_contact} size={iconSize}/></Link>}
                {links?.github &&   <Link href={links.github} target="_blank"><IconBrandGithub className={styles.icon_contact} size={iconSize}/></Link>}
                {links?.instagram && <Link href={links.instagram} target="_blank"><IconBrandInstagram className={styles.icon_contact} size={iconSize}/></Link>}
                {links?.facebook && <Link href={links.facebook} target="_blank"><IconBrandFacebook className={styles.icon_contact} size={iconSize}/></Link>}
                {phone && <a href={`tel:${phone}`}><IconPhone className={styles.icon_contact} size={iconSize}/></a>}
                {email && <a href={`mailtol:${email}`} target="_blank"><IconMail className={styles.icon_contact} size={iconSize}/></a>}
            </div>
        </div>
    </article>
  )
}
