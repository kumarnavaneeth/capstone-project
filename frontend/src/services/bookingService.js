import api from "./api";

const bookingService = {
  createBooking: (flightId, bookingData) => 
    api.post(`/booking/${flightId}`, bookingData),

  cancelBooking: (pnr) =>
    api.patch(`/booking/cancel/${pnr}`),

  getBookingHistory: (userId) =>
    api.get(`/booking/history/${userId}`),

  getTicketByPnr: (pnr) =>
    api.get(`/booking/ticket/${pnr}`),
};

export default bookingService;