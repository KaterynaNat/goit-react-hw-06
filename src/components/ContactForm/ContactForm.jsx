import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { selectContacts } from "../../redux/selectors";

const phoneRegex = /^[\d\s+\-()]*$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Please enter data"),
  number: Yup.string()
    .matches(
      phoneRegex,
      "Phone number can only contain numbers and +, -, (), spaces."
    )
    .required("Please enter data"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const duplicate = contacts.find(
      (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (duplicate) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    dispatch(
      addContact({
        id: String(Date.now()),
        name: values.name,
        number: values.number,
      })
    );

    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
            />
            <input
              type="text"
              name="number"
              placeholder="Enter phone number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.input}
            />
            <button type="submit" className={styles.submitButton}>
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
