package com.flight.app.controller;

import com.flight.app.dto.FlightResponse;
import com.flight.app.dto.SearchRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/flight")
public class FlightController {

    @PostMapping("/search")
    public Map<String, Object> searchFlights(@RequestBody SearchRequest request) {

        List<FlightResponse> flights = new ArrayList<>();

        FlightResponse f1 = new FlightResponse();
        f1.setFlightNumber("AI202");
        f1.setAirline("Air India");
        f1.setDepartureTime("10:00");
        f1.setArrivalTime("12:00");
        f1.setPrice(5000);

        FlightResponse f2 = new FlightResponse();
        f2.setFlightNumber("6E101");
        f2.setAirline("Indigo");
        f2.setDepartureTime("14:00");
        f2.setArrivalTime("16:00");
        f2.setPrice(4500);

        flights.add(f1);
        flights.add(f2);

        Map<String, Object> response = new HashMap<>();
        response.put("flights", flights);

        return response;
    }
}
