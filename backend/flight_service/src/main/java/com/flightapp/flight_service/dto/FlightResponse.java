package com.flightapp.flight_service.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.flightapp.flight_service.enums.FlightStatus;
import lombok.Data;

@Data
@JsonPropertyOrder({
        "source",
        "destination",
        "airline",
        "flightNumber",
        "price",
        "departureTime",
        "arrivalTime",
        "nonBusinessClassSeats",
        "businessClassSeats",
        "aircraftType",
        "status"
})
public class FlightResponse {
	
	private Long flightId;

    private String source;
    private String destination;
    private String airline;
    private String flightNumber;
    private Float price;
    private String departureTime;
    private String arrivalTime;
    private Integer nonBusinessClassSeats;
    private Integer businessClassSeats;
    private String aircraftType;
    private FlightStatus status;
}
