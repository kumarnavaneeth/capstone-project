package com.flightapp.flight_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingEvent {
	private Long flightId;
	private Integer passengerCount;
	private Boolean isBusinessClass;
}
