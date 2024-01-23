import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RestaurantDescription() {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/restaurant_pizza`)
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch((error) => console.error("Error fetching restaurant:", error));
  }, [id]);

  if (!restaurant) return <h1>Loading...</h1>;

  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p >{restaurant.address}</p>
      <h3>Pizzas:</h3>
      <ul>
        {restaurant.pizzas.map((pizza) => (
          <li key={pizza.id}>
            <Link to={`/pizzas/${pizza.id}`} className="text-decoration-none">
              {pizza.name}
            </Link>
            <p >{pizza.ingredients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantDescription;
