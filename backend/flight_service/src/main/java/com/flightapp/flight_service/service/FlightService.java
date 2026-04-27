package com.flightapp.flight_service.service;

import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Airline;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.AirlineStatus;
import com.flightapp.flight_service.enums.FlightStatus;
import com.flightapp.flight_service.repository.AirlineRepository;
import com.flightapp.flight_service.repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirlineRepository airlineRepository;

    public FlightService(FlightRepository flightRepository,
                         AirlineRepository airlineRepository) {
        this.flightRepository = flightRepository;
        this.airlineRepository = airlineRepository;
    }

    public List<FlightResponse> searchFlights(SearchRequest request) {

        List<Flight> flights = flightRepository.searchFlights(
                request.getSource(),
                request.getDestination(),
                request.getTravelDate(),
                FlightStatus.AVAILABLE
        );

        flights = flights.stream()
                .filter(flight -> airlineRepository
                        .findByAirlineName(flight.getAirlineName())
                        .map(airline -> airline.getStatus() == AirlineStatus.ACTIVE)
                        .orElse(false))
                .collect(Collectors.toList());

        return flights.stream().map(f -> {
            FlightResponse res = new FlightResponse();
            res.setSource(f.getSource());
            res.setDestination(f.getDestination());
            res.setAirline(f.getAirlineName());
            res.setFlightNumber(f.getFlightNumber());
            res.setPrice(f.getTicketPrice());
            res.setDepartureTime(f.getDepartureTime().toString());
            res.setArrivalTime(f.getArrivalTime().toString());
            res.setNonBusinessClassSeats(f.getNonBusinessClassSeats());
            res.setBusinessClassSeats(f.getBusinessClassSeats());
            res.setAircraftType(f.getAircraftType());
            res.setStatus(f.getStatus());
            return res;
        }).collect(Collectors.toList());
    }

    public Flight addFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    public void updateFlightStatus(Long flightId, FlightStatus status) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        flight.setStatus(status);
        flightRepository.save(flight);
    }

    public void blockAirline(Long airlineId) {
        Airline airline = airlineRepository.findById(airlineId)
                .orElseThrow(() -> new RuntimeException("Airline not found"));

        airline.setStatus(AirlineStatus.BLOCKED);
        airlineRepository.save(airline);
    }

    public void activateAirline(Long airlineId) {
        Airline airline = airlineRepository.findById(airlineId)
                .orElseThrow(() -> new RuntimeException("Airline not found"));

        airline.setStatus(AirlineStatus.ACTIVE);
        airlineRepository.save(airline);
    }
}
