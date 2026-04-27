package com.flightapp.flight_service.repository;

import com.flightapp.flight_service.entity.Airline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AirlineRepository extends JpaRepository<Airline, Long> {
    Optional<Airline> findByAirlineName(String airlineName);
}
