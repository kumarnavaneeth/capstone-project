package com.flightapp.flight_service.controller;

import com.flightapp.flight_service.dto.FlightResponse;
import com.flightapp.flight_service.dto.SearchRequest;
import com.flightapp.flight_service.entity.Airline;
import com.flightapp.flight_service.entity.Flight;
import com.flightapp.flight_service.enums.FlightStatus;
import com.flightapp.flight_service.service.FlightService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api/v1.0/flight")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @PostMapping("/search")
    public List<FlightResponse> searchFlights(@Valid @RequestBody SearchRequest request) {
        return flightService.searchFlights(request);
    }
    @PostMapping public ResponseEntity<Flight> addFlight(@Valid @RequestBody Flight flight) { 
    Flight savedFlight = flightService.addFlight(flight); 
    return new ResponseEntity<>(savedFlight, HttpStatus.CREATED); }

    @PostMapping("/{flightId}/status")
    public ResponseEntity<String> updateFlightStatus(
            @PathVariable Long flightId,
            @RequestParam FlightStatus status) {

        flightService.updateFlightStatus(flightId, status);
        return ResponseEntity.ok("Flight status updated successfully");
    }

    @PostMapping("/airline/{airlineId}/block")
    public ResponseEntity<String> blockAirline(@PathVariable Long airlineId) {
        flightService.blockAirline(airlineId);
        return ResponseEntity.ok("Airline blocked successfully");
    }

    @PostMapping("/airline/{airlineId}/activate")
    public ResponseEntity<String> activateAirline(@PathVariable Long airlineId) {
        flightService.activateAirline(airlineId);
        return ResponseEntity.ok("Airline activated successfully");
    }
    @PostMapping("/airline/register")
    public ResponseEntity<Airline> registerAirline(@Valid @RequestBody Airline airline){
    	Airline savedAirline = flightService.registerAirline(airline);
    	return new ResponseEntity<>(savedAirline,HttpStatus.CREATED);
    }
    
	@GetMapping("/{flightId}")
	public ResponseEntity<Flight> getFlightById(@PathVariable Long flightId) {
		Flight flight = flightService.getFlightById(flightId);
		return ResponseEntity.ok(flight);
	}
}