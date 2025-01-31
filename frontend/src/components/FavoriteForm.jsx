import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function FavoriteForm() {
  const [favorites, setFavorites] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFavoriteId, setCurrentFavoriteId] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const favoriteSchema = Yup.object().shape({
    user_id: Yup.number().required('User ID is required'),
    contact_id: Yup.number().required('Contact ID is required'),
    starred: Yup.boolean()
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `http://127.0.0.1:5000/favorites/${currentFavoriteId}` : 'http://127.0.0.1:5000/favorites';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editMode ? 'update' : 'create'} favorite`);
      }

      resetForm();
      setEditMode(false);
      setCurrentFavoriteId(null);
      loadFavorites();
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} favorite:`, error);
    }
  };

  const handleEdit = (favorite) => {
    setEditMode(true);
    setCurrentFavoriteId(favorite.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/favorites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }
      loadFavorites();
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  return (
    <div>
      <h2>Favorite Form</h2>
      <Formik
        initialValues={{ user_id: '', contact_id: '', starred: false }}
        validationSchema={favoriteSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div>
              <label htmlFor="user_id">User ID</label>
              <Field name="user_id" type="number" />
              <ErrorMessage name="user_id" component="div" />
            </div>
            <div>
              <label htmlFor="contact_id">Contact ID</label>
              <Field name="contact_id" type="number" />
              <ErrorMessage name="contact_id" component="div" />
            </div>
            <div>
              <label htmlFor="starred">Starred</label>
              <Field name="starred" type="checkbox" />
              <ErrorMessage name="starred" component="div" />
            </div>
            <button type="submit">{editMode ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => resetForm()}>Clear Form</button>
          </Form>
        )}
      </Formik>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            User ID: {favorite.user_id}, Contact ID: {favorite.contact_id}, Starred: {favorite.starred ? 'Yes' : 'No'}{' '}
            <button onClick={() => handleEdit(favorite)}>Edit</button>{' '}
            <button onClick={() => handleDelete(favorite.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteForm;