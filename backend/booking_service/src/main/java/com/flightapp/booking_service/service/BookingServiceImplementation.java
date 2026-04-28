package com.flightapp.booking_service.service;

import org.springframework.stereotype.Service;

import com.flightapp.booking_service.entity.BookingRequest;

@Service
public class BookingServiceImplementation implements BookingService {

    @Override
    public String createBooking(BookingRequest bookingRequest) {

        return "Booking request received for user: "
                + bookingRequest.getUserId()
                + " and flight: "
                + bookingRequest.getFlightId();
    }
}