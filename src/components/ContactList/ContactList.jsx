import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/selectors";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={styles.contactList}>
      {filteredContacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))
      )}
    </div>
  );
};

export default ContactList;
