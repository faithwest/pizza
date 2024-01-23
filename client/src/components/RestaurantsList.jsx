import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => restaurant.id !== id)
        );
      }
    });
  }

  return (
    <div>
      <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Restaurants 🍕🛎️👨🏻‍🍳</h1>
      <div style={{ paddingBottom: '20px', textAlign: 'center' }}>
        <button className="add-button">
          <Link to="/restaurant_pizzas/new" className="add-link">
            Add a new Pizza
          </Link>
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {restaurants.map(restaurant => (
          <li key={restaurant.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <Link to={`/restaurants/${restaurant.id}`} style={{ fontSize: '1.2em', color: '#333', textDecoration: 'none' }}>
              {restaurant.name} 🥗
            </Link>
            <p style={{ color: '#666', marginTop: '5px' }}>{restaurant.address} ⛟</p>
            <button
              type="button"
              onClick={() => handleDelete(restaurant.id)}
              style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantsList;
