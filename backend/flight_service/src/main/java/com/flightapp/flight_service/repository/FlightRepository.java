package com.flightapp.flight_service.repository;

import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.FlightStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    @Query("SELECT f FROM Flight f WHERE " +
           "LOWER(f.source) = LOWER(:source) AND " +
           "LOWER(f.destination) = LOWER(:destination) AND " +
           "DATE(f.departureTime) = :travelDate AND " +
           "f.status = :status")
    List<Flight> searchFlights(
            @Param("source") String source,
            @Param("destination") String destination,
            @Param("travelDate") LocalDate travelDate,
            @Param("status") FlightStatus status
    );
}
