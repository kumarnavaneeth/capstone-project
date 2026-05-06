import api from "./api";

const flightService = {
  searchFlights: (criteria) => api.post("/flights/search", criteria),
  addFlight: (flightData) => api.post("/flights", flightData),
  registerAirline: (airlineData) => api.post("/flights/airline/register", airlineData),
  blockAirline: (airlineId) => api.post(`/flights/airline/${airlineId}/block`),
  activateAirline: (airlineId) => api.post(`/flights/airline/${airlineId}/activate`),
};

export default flightService;
