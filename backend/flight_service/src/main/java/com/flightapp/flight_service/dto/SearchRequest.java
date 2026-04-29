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

    @NotBlank(message = "{source.required}")
    @Pattern(regexp = ValidationConstants.CITY_PATTERN, message = "{city.invalid}")
    private String source;

    @NotBlank(message = "{destination.required}")
    @Pattern(regexp = ValidationConstants.CITY_PATTERN, message = "{city.invalid}")
    private String destination;

    @NotNull(message = "{travel.date.required}")
    @FutureOrPresent(message = "${travel.date.invalid}")
    private LocalDate travelDate;

    @NotNull(message = "{travellers.required}")
    @Min(value = 1, message = "{travellers.min}")
    private Integer numberOfTravellers;
    
    
}
