package com.flightapp.flight_service.service;

import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.FlightStatus;
import com.flightapp.flight_service.repository.FlightRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<FlightResponse> searchFlights(SearchRequest request) {

        if (request.getSource() == null || request.getSource().isBlank()) {
            throw new RuntimeException("Source cannot be empty");
        }
        if (request.getDestination() == null || request.getDestination().isBlank()) {
            throw new RuntimeException("Destination cannot be empty");
        }
        if (!request.getSource().matches("[a-zA-Z ]+") ||
            !request.getDestination().matches("[a-zA-Z ]+")) {
            throw new RuntimeException("City names must contain only letters");
        }
        if (request.getTravelDate() == null) {
            throw new RuntimeException("Travel date is required");
        }
        if (request.getTravelDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Travel date cannot be in the past");
        }
        List<Flight> flights = flightRepository.searchFlights(
                request.getSource(),
                request.getDestination(),
                request.getTravelDate(),
                FlightStatus.ACTIVE
        );

        return flights.stream().map(f -> {
            FlightResponse res = new FlightResponse();
            res.setFlightNumber(f.getFlightNumber());
            res.setAirline(f.getAirlineName());
            res.setDepartureTime(f.getDepartureTime().toString());
            res.setArrivalTime(f.getArrivalTime().toString());
            res.setPrice(f.getTicketPrice());
            res.setBusinessClassSeats(f.getBusinessClassSeats());
            res.setNonBusinessClassSeats(f.getNonBusinessClassSeats());
            res.setStatus(f.getStatus());
            res.setAircraftType(f.getAircraftType());
            res.setSource(f.getSource());
            res.setDestination(f.getDestination());
            
            return res;
        }).collect(Collectors.toList());
    }
}
