import api from "./api";

const flightService = {
  searchFlights: (criteria) => api.post("/flights/search", criteria),
  addFlight: (flightData) => api.post("/flights", flightData),
<<<<<<< HEAD
  getFlightById: (flightId) => api.get(`/flights/${flightId}`),
=======
>>>>>>> 8250be5b2e4aabc54431c3e9d8d005fed36d660e
  registerAirline: (airlineData) => api.post("/flights/airline/register", airlineData),
  blockAirline: (airlineId) => api.post(`/flights/airline/${airlineId}/block`),
  activateAirline: (airlineId) => api.post(`/flights/airline/${airlineId}/activate`),
};

export default flightService;
