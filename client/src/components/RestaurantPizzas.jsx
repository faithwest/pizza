import React, { useState, useEffect } from 'react';
import pizza2 from '../components/images/pizza2.jpg';

function RestaurantPizzas() {
  const [restaurant_pizzas, setRestaurant_pizzas] = useState([]);

  useEffect(() => {
    // Fetch pizzas from backend
    fetch('/restaurant_pizzas')
      .then(response => response.json())
      .then(data => setRestaurant_pizzas(data));
  }, []);

  return (
    <div  style={{ backgroundImage: `url(${pizza2})` }}>

      <h2>Restaurants</h2>
      <ul>
        {restaurant_pizzas.map((pizza) => (
          <li key={pizza.pizza.id}>
            <h3>{pizza.pizza.name}</h3>
            <p className="ingredients">Ingredients: {pizza.pizza.ingredients}</p>
            <p className="price">Price: ${pizza.price}</p>
            <p>
              Restaurant: {pizza.restaurant.name} - {pizza.restaurant.address}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantPizzas;
