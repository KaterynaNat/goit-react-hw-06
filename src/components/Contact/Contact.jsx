import styles from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className={styles.contact}>
      <span>
        {contact.name}: {contact.number}
      </span>
      <button className={styles.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
