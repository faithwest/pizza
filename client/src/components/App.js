import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import pizza from './Pizza';
import PizzasList from './PizzasList';
import RestaurantsList from './RestaurantsList';
import RestaurantDescription from "./RestaurantDescription";
import RestaurantPizzas from "./RestaurantPizzas";
import PizzaForm from "./PizzaForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestaurantsList />} />
          <Route path="/restaurants/:id" element={<RestaurantDescription />} />
          <Route path="/pizza" element={pizza} />
          <Route path="/pizzas" element={<PizzasList />} />
          <Route path="/restaurantpizzas" element={<RestaurantPizzas />} />
          <Route path="/restaurantpizzas/new" element={<PizzaForm />} />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
