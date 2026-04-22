package com.flightapp.flight_service.dto;

import lombok.Data;

@Data
public class SearchRequest {

    private String source;       
    private String destination;  
    private String travelDate;   
    private String tripType;   
}

