import React, { useState, useEffect } from 'react';

const PizzasList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/pizzas')
      .then(response => response.json())
      .then(data => {
        setPizzas(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Provide an empty dependency array

  return (
    <div>
      <h2>Pizzas List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {pizzas.length > 0 && (
        <ul>
          {pizzas.map((pizza) => (
            <li key={pizza.id}>
              <strong>{pizza.name} {pizza.price} {pizza.restaurant}</strong> - {pizza.ingredients}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PizzasList;
