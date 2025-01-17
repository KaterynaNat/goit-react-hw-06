import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

// Redux
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
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.fieldContainer}>
              <Field
                type="text"
                name="name"
                placeholder="Enter name"
                className={`${styles.input} ${
                  errors.name && touched.name ? styles.inputError : ""
                }`}
              />
              {}
              {errors.name && touched.name && (
                <div className={styles.error}>{errors.name}</div>
              )}
            </div>

            <div className={styles.fieldContainer}>
              <Field
                type="text"
                name="number"
                placeholder="Enter phone number"
                className={`${styles.input} ${
                  errors.number && touched.number ? styles.inputError : ""
                }`}
              />
              {}
              {errors.number && touched.number && (
                <div className={styles.error}>{errors.number}</div>
              )}
            </div>

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
