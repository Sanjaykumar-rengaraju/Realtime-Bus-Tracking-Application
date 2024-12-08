import React from "react";
import MapView from "./MapView";
import TicketPayment from "./TicketPayment";

const Home = () => {
  return (
    <div>
      <h1>Bus Tracker and Ticketing</h1>
      <MapView />
      <TicketPayment />
    </div>
  );
};

export default Home;