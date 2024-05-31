import Contact from '@/types/contact';

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard({contact}: ContactCardProps) {
  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <p>{contact.company}</p>
      <p>{contact.position}</p>
      <p>{contact.notes}</p>
    </div>
  )
}
