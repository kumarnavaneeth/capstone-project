package com.flightapp.booking_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightapp.booking_service.entity.BookingRequest;
import com.flightapp.booking_service.service.BookingService;

@RestController
@RequestMapping("/api/version1/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/status")
    public String getServiceStatus() {
        return "Booking Service is running";
    }

    @PostMapping
    public String createBooking(@RequestBody BookingRequest bookingRequest) {
        return bookingService.createBooking(bookingRequest);
    }
}