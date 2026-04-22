package com.flightapp.booking_service.service;

import com.flightapp.booking_service.entity.BookingRequest;

public interface BookingService {

    String createBooking(BookingRequest bookingRequest);
}