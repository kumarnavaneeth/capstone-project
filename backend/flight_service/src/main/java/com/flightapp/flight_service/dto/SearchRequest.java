package com.flightapp.flight_service.dto;
import lombok.Data;
import java.time.LocalDate;

@Data
public class SearchRequest {

    private String source;
    private String destination;
    private LocalDate travelDate; 
    private Integer numberOfTravellers;
}
