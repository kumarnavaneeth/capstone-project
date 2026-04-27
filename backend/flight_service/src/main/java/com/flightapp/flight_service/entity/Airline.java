package com.flightapp.flight_service.entity;

import com.flightapp.flight_service.enums.AirlineStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    private String airlineName;

    @Enumerated(EnumType.STRING)
    private AirlineStatus status;

    private String contactNumber;

    private String headquarters;
}
