package com.flightapp.booking_service.controller;

import com.flightapp.booking_service.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/test")
    public String test() {
        return bookingService.testBookingService();
    }
}