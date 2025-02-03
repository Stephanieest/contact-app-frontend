import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UserForm() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const userSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://127.0.0.1:8000/users/${currentUserId}` : 'http://127.0.0.1:8000/users';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'update' : 'create'} user`);
      }

      resetForm();
      setEditMode(false);
      setCurrentUserId(null);
      loadUsers();
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} user:`, error);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUserId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>User Form</h2>
      <Formik
        initialValues={{ username: '', email: '' }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <button type="submit">{editMode ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => resetForm()}>Clear Form</button>
          </Form>
        )}
      </Formik>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email}){' '}
            <button onClick={() => handleEdit(user)}>Edit</button>{' '}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserForm;