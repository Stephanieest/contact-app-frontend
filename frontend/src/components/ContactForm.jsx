import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ContactForm() {
  const [contacts, setContacts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentContactId, setCurrentContactId] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    address: Yup.string(),
    user_id: Yup.number().required('User ID is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://127.0.0.1:8000/contacts/${currentContactId}` : 'http://127.0.0.1:8000/contacts';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'update' : 'create'} contact`);
      }

      resetForm();
      setEditMode(false);
      setCurrentContactId(null);
      loadContacts();
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} contact:`, error);
    }
  };

  const handleEdit = (contact) => {
    setEditMode(true);
    setCurrentContactId(contact.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/contacts${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }
      loadContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <Formik
        initialValues={{ name: '', phone: '', email: '', address: '', user_id: '' }}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field name="name" />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <Field name="phone" />
              <ErrorMessage name="phone" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" />
              <ErrorMessage name="address" component="div" />
            </div>
            <div>
              <label htmlFor="user_id">User ID</label>
              <Field name="user_id" type="number" />
              <ErrorMessage name="user_id" component="div" />
            </div>
            <button type="submit">{editMode ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => resetForm()}>Clear Form</button>
          </Form>
        )}
      </Formik>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} ({contact.phone}, {contact.email}, {contact.address}){' '}
            <button onClick={() => handleEdit(contact)}>Edit</button>{' '}
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactForm;
