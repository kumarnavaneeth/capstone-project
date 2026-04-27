package com.flightapp.flight_service.entity;

import com.flightapp.flight_service.enums.FlightStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "flight")
@Data
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    private String airlineName;
    private String flightNumber;
    private String source;
    private String destination;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private int duration;//In Minutes
    private int availableSeats;
    private float ticketPrice;
    private String mealOption;
    private String scheduleDays;
    private String aircraftType;
    private int businessClassSeats;
    private int nonBusinessClassSeats;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FlightStatus status;
}
