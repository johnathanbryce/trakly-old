// Components
import ContactsList from "./ContactsList/ContactsList"

//** DONT FETCH DATA HERE, FETCH INSIDE ContactsLIST.tsx */
export default function Contacts() {
  return (
    <section>
      <ContactsList />
    </section>
  )
}