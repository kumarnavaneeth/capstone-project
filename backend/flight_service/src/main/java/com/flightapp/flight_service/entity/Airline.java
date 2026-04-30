package com.flightapp.flight_service.entity;

import com.flightapp.flight_service.enums.AirlineStatus;
import com.flightapp.flight_service.exceptions.ValidationConstants;

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

@Entity
@Table(name="airlines")
@Data
public class Airline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long airlineId;

    @NotBlank(message="{airline.name.required}")
    @Pattern(regexp = ValidationConstants.CITY_PATTERN, message="{airline.name.invalid}")
    private String airlineName;

    @Enumerated(EnumType.STRING)
    private AirlineStatus status;

    @NotBlank(message = "{contact.required}")
    @Pattern(regexp = "^[0-9]{10}$", message = "{contact.invalid}")
    private String contactNumber;


    @NotBlank(message = "{headquarters.required}")
    @Pattern(regexp = ValidationConstants.CITY_PATTERN, message = "{city.invalid}")
    private String headquarters;
}