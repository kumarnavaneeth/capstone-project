package com.flightapp.flight_service.controller;

import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/flight")
public class FlightController {

    @Autowired
    private FlightService flightService;

    @PostMapping("/search")
    public List<Flight> searchFlights(@RequestBody SearchRequest request) {
        return flightService.searchFlights(
                request.getSource(),
                request.getDestination(),
                request.getTravelDate(),
                request.getTripType()
        );
    }
}
