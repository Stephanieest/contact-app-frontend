import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string()
});

function AddContact() {
  return (
    <div>
      <h1>Add Contact</h1>
      <Formik
        initialValues={{ name: '', phone: '', email: '', address: '' }}
        validationSchema={ContactSchema}
        onSubmit={(values, { setSubmitting }) => {
          fetch('http://localhost:5000/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then(response => response.json())
            .then(data => {
              setSubmitting(false);
              alert(data.message);
            })
            .catch(error => {
              setSubmitting(false);
              console.error('Error adding contact:', error);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label>Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Address</label>
              <Field type="text" name="address" />
              <ErrorMessage name="address" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Add Contact</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddContact;