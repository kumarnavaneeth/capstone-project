package com.flightapp.booking_service.service;

import org.springframework.stereotype.Service;

@Service
public class BookingServiceImplementation implements BookingService {

    @Override
    public String testBookingService() {
        return "Booking Service is working properly!";
    }
}