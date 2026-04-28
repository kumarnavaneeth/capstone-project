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

        boolean blockedAirlineExists = flights.stream()
                .anyMatch(flight -> airlineRepository
                        .findByAirlineName(flight.getAirlineName())
                        .map(airline -> airline.getStatus() == AirlineStatus.BLOCKED)
                        .orElse(false));

        if (blockedAirlineExists) {
            throw new RuntimeException("Airline is currently blocked and cannot proceed with bookings");
        }
    
        return flights.stream().map(flight -> {
            FlightResponse response = new FlightResponse();
            response.setSource(flight.getSource());
            response.setDestination(flight.getDestination());
            response.setAirline(flight.getAirlineName());
            response.setFlightNumber(flight.getFlightNumber());
            response.setPrice(flight.getTicketPrice());
            response.setDepartureTime(flight.getDepartureTime().toString());
            response.setArrivalTime(flight.getArrivalTime().toString());
            response.setNonBusinessClassSeats(flight.getNonBusinessClassSeats());
            response.setBusinessClassSeats(flight.getBusinessClassSeats());
            response.setAircraftType(flight.getAircraftType());
            response.setStatus(flight.getStatus());
            return response;
        }).collect(Collectors.toList());
    }

    public Flight addFlight(Flight flight) {
        if (flight.getStatus() == null) {
            flight.setStatus(FlightStatus.AVAILABLE);
        }
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

    public Airline registerAirline(Airline airline) {
        if (airline.getStatus() == null) {
            airline.setStatus(AirlineStatus.ACTIVE);
        }
        return airlineRepository.save(airline);
    }
}
