import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Pizza() {
  const [pizzas, setPizzas] = useState([]);
  const [pizzaId, setPizzaId] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [price, setPrice] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/pizzas", setPizzas);
    fetchData("/restaurants", setRestaurants);
  }, []);

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      pizza_id: pizzaId,
      restaurant_id: restaurantId,
      price: parseInt(price),
    };

    try {
      const response = await fetch("/restaurant_pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const errors = (await response.json()).errors || [];
        setFormErrors(errors);
      }
    } catch (error) {
      console.error("Error adding pizza to restaurant:", error);
      setFormErrors(["An error occurred while adding the pizza. Please try again."]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("number", "price", "Price", price, setPrice)}
        {renderSelect("pizzaId", "Select Pizza", pizzaId, setPizzaId, pizzas)}
        {renderSelect("restaurantId", "Select Restaurant", restaurantId, setRestaurantId, restaurants)}

        {formErrors.length > 0 &&
          formErrors.map((err, index) => (
            <p key={index} style={{ color: "red" }}>
              {err}
            </p>
          ))}

        <button type="submit">Add To Restaurant</button>
      </form>
    </div>
  );
}

const renderInput = (type, id, label, value, setValue) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <input type={type} value={value} onChange={(e) => setValue(e.target.value)} />
  </div>
);

const renderSelect = (id, label, value, setValue, options) => (
  <div>
    <label htmlFor={id}>{label}:</label>
    <select id={id} name={id} value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default Pizza;
