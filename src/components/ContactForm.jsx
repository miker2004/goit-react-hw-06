import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

const ContactForm = ({ addContact }) => {

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),  // Generowanie unikalnego id
      name: values.name,
      number: values.number,
    };

    console.log('New Contact:', newContact);  // Debugowanie
    addContact(newContact);
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="form-add-contact">
          <div>
            <p>Name</p>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="search-field"
            />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>
          <div>
            <p>Number</p>
            <Field
              type="text"
              name="number"
              placeholder="Number"
              className="search-field"
            />
            <ErrorMessage name="number" component="div" className="error-message" />
          </div>
          <button type="submit" className="form-button">Add Contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
