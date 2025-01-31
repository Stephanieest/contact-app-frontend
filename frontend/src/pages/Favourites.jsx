import React, { useEffect, useState } from 'react';

function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/favourites')
      .then(response => response.json())
      .then(data => setFavourites(data))
      .catch(error => console.error('Error fetching favourites:', error));
  }, []);

  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {favourites.map(fav => (
          <li key={fav.id}>Contact ID: {fav.contact_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favourites;