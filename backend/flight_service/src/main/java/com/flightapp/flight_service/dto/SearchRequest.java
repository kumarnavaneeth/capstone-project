package com.flightapp.flight_service.dto;

import com.flightapp.flight_service.exceptions.ValidationConstants;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchRequest {

    private String source;
    private String destination;
    private LocalDate travelDate; 
    private Integer numberOfTravellers;
}
