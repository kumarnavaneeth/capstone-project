package com.flightapp.flight_service.dto;

import lombok.Data;

@Data
public class FlightResponse {

    private String flightNumber; 
    private String airline;      
    private String departureTime; 
    private String arrivalTime;  
    private double price;         
}
