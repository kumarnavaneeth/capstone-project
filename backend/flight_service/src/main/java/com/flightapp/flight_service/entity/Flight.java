package com.flightapp.flight_service.entity;

import com.flightapp.flight_service.enums.FlightStatus;
import com.flightapp.flight_service.exceptions.ValidationConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "flight")
@Data
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;

    @NotBlank(message = "{airline.name.required}")
    @Pattern(regexp = ValidationConstants.CITY_PATTERN, message = "{airline.name.invalid}")
    private String airlineName;

    @NotBlank(message = "{flight.number.required}")
    @Pattern(
        regexp = ValidationConstants.FLIGHT_NUMBER_PATTERN,
        message = "{flight.number.invalid}"
    )
    private String flightNumber;

    @NotBlank(message = "{source.required}")
    @Pattern(
        regexp = ValidationConstants.CITY_PATTERN,
        message = "{city.invalid}"
    )
    private String source;

    @NotBlank(message = "{destination.required}")
    @Pattern(
        regexp = ValidationConstants.CITY_PATTERN,
        message = "{city.invalid}"
    )
    private String destination;

    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private int duration; // In Minutes
    private int availableSeats;
    private float ticketPrice;
    private String mealOption;
    private String scheduleDays;

    @NotBlank(message = "{aircraft.type.required}")
    @Pattern(
        regexp = ValidationConstants.AIRCRAFT_TYPE_PATTERN,
        message = "{aircraft.type.invalid}"
    )
    private String aircraftType;

    private int businessClassSeats;
    private int nonBusinessClassSeats;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private FlightStatus status;
}
