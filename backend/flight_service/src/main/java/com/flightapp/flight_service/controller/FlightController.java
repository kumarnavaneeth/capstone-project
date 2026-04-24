package com.flightapp.flight_service.controller;
import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.service.FlightService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1.0/flight")
public class FlightController {
	private final FlightService flightService;
	public FlightController(FlightService flightService) {
		this.flightService = flightService;
	}
	@PostMapping("/search")
	public List<FlightResponse> searchFlights(@RequestBody SearchRequest request) {
		return flightService.searchFlights(request);
	}
}
